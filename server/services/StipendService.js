const { getStipendCollection } = require('../models/db');
const {pool} =require("../models/db");

exports.createStipend = async (data) => {
  const collection = getStipendCollection();
  
  if (Array.isArray(data)) {
    return await collection.insertMany(data);
  } else {
    return await collection.insertOne(data);
  }
};
exports.fetchAllStipends = async () => {
  const collection = getStipendCollection();
  return await collection.find().toArray();
};

const getStudentDetails = async (application_no) => {
  try {
    const result = await pool.query(
      `SELECT * FROM stipend_data WHERE roll_no = $1`, [application_no] );

    if (result.rows.length === 0) return null; // No student found

    const student = result.rows[0];
    const todayDate = new Date();

    const stipendResult = await pool.query(
      `SELECT * FROM course_stipend
       WHERE course = $1
       AND year = $2
       AND (
         (to_date IS NULL AND from_date <= $3) 
         OR (to_date IS NOT NULL AND from_date <= $3 AND to_date >= $3)
       )
       ORDER BY from_date DESC
       LIMIT 1`,
      [student.course, student.year, todayDate]
    );

    student.actualStipend = stipendResult.rows[0]?.stipend || 0;
    return student;

  } catch (error) {
    console.error("Error fetching student details:", error.message);
    throw error;
  }
};


const insertStipendDetails = async (data) => {
  try {
    // Determine the role-specific columns
    let column_id = null;
    let column_name = null;

    if (data.userRole === 'Checker') {
      column_id = 'checker_id';
      column_name = 'checker_name';
    } else if (data.userRole === 'Verifier') {
      column_id = 'verifier_id';
      column_name = 'verifier_name';
    } else if (data.userRole === 'Approver') {
      column_id = 'approver_id';
      column_name = 'approver_name';
    }

    // If editing an existing record
    if (data.isEdit && data.id) {
      const query = `
        UPDATE stipend_details SET 
          roll_no = $1, name = $2, course = $3, account_no = $4, doj = $5, leaves = $6,
          present = $7, stipend = $8, actual_stipend = $9, cur_month = $10,
          ${column_id} = $11, ${column_name} = $12 WHERE id = $13 `;
      await pool.query(query, [
        data.rollNo, data.name, data.course, data.accountNo, data.joiningDate, data.leavesBalance,
        data.presentAndHolidays, data.stipend, data.actualStipend, data.cur_month || null,
        data.userId || null, data.user_name || null,  data.id ]);
      return;
    }
    const existingRecord = await pool.query(
      `SELECT * FROM stipend_details WHERE roll_no = $1 AND cur_month = $2`, 
      [data.rollNo, data.cur_month]
    );
    if (existingRecord.rows.length > 0) {
      const updateRes = await pool.query(
        `UPDATE stipend_details SET 
          name = $1, course = $2, account_no = $3, doj = $4, leaves = $5, 
          present = $6, stipend = $7, actual_stipend = $8,
          ${column_id} = $9, ${column_name} = $10
         WHERE roll_no = $11 AND cur_month = $12`,
        [
          data.name, data.course, data.accountNo, data.joiningDate, data.leavesBalance,
          data.presentAndHolidays, data.stipend, data.actualStipend,  data.userId || null, data.user_name || null,
          data.rollNo, data.cur_month
        ]
      );
      if (updateRes.rowCount > 0) {
        return;
      }
    }
    // Insert new record
    const query = `
      INSERT INTO stipend_details 
        (roll_no, name, course, account_no, doj, leaves, present, stipend, actual_stipend, cur_month, ${column_id}, ${column_name})
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;
    await pool.query(query, [
      data.rollNo, data.name, data.course, data.accountNo, data.joiningDate,
      data.leavesBalance, data.presentAndHolidays, data.stipend, data.actualStipend,
      data.cur_month || null, data.userId || null, data.user_name || null ]);
  } catch (error) {
    console.error('Error inserting stipend details:', error.message);
    throw error;
  }
};


const fetchAllStipends = async (role, month) => {
  try {
    let result;
    if(role === 'Checker'){
      result = await pool.query('SELECT * FROM stipend_details where cur_month = $1', [month]);
    } else if(role === 'Verifier'){
      result = await pool.query("SELECT * FROM stipend_details WHERE checker_status = 'approved' and cur_month = $1", [month]);
    } else if(role === 'Approver' || role === "FA" || role === "FC"){
      result = await pool.query("SELECT * FROM stipend_details WHERE checker_status = 'approved' AND verifier_status = 'approved' and cur_month = $1", [month]);
    }
    return result.rows;
  } catch (error) {
    console.error('Error fetching stipends in service:', err.message);
    throw error; 
  }
};

const stipendApprovalStatus = async (id, status, role) => {
  try {
    if (role === 'Checker') {
      const result = await pool.query('update stipend_details set checker_status = $1 WHERE id = $2', [status, id]);
      return result.rowCount > 0;
    } else if (role === 'Verifier') {
      const result = await pool.query('update stipend_details set verifier_status = $1 WHERE id = $2', [status, id]);
      return result.rowCount > 0;
    } else if (role === 'Approver') {
      const result = await pool.query('update stipend_details set approver_status = $1 WHERE id = $2', [status, id]);
      return result.rowCount > 0;
    }
    else {
      throw new Error('Invalid role');
    }
  }
  catch (error) {
    console.error('Error fetching stipends in service:', err.message);
    throw error; 
  }
};

const stipendBulkApproval = async (data, status, role) => {
  try {
    if (role === 'Checker') {
      for (let id of data) {
        const result = await pool.query('update stipend_details set checker_status = $1 WHERE id = $2', [status, id]);
      }
      return true;
    } else if (role === 'Verifier') {
      for (let id of data) {
        const result = await pool.query('update stipend_details set verifier_status = $1 WHERE id = $2', [status, id]);
      }
      return true;
    } else if (role === 'Approver') {
      for (let id of data) {
        const result = await pool.query('update stipend_details set approver_status = $1 WHERE id = $2', [status, id]);
      }
      return true;
    }
    return false;
  }
  catch (error) {
    console.error('Error fetching stipends in service:', err.message);
    throw error; 
  }
};

//Add course stipend
const addCourseStipend = async (data) => {
  try {
    const isCourseYearExist = await pool.query(
      `SELECT * FROM course_stipend WHERE course = $1 and year = $2 and semester = $3`,
      [data.course, data.year, data.semester]
    );
    if (isCourseYearExist.rows.length > 0) {
      const endingDate = new Date(data.from_date)
      endingDate.setDate(endingDate.getDate() - 1);
      await pool.query(
        `UPDATE course_stipend SET to_date = $1 WHERE course = $2 and year = $3 and semester = $4`,
        [endingDate, data.course, data.year, data.semester]
      );
    }
    const result = await pool.query(
      `INSERT INTO course_stipend (course, year, stipend, semester, from_date, to_date, user_id, user_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [data.course, data.year, data.stipend, data.semester, data.from_date, data.to_date || null, data.userId, data.user_name]
    );
    return result.rows[0];
  }
  catch (error) {
    console.error('Error adding course stipend in service:', err.message);
    throw error; 
  }
};

module.exports = { getStudentDetails, insertStipendDetails, fetchAllStipends, 
  stipendApprovalStatus, stipendBulkApproval, addCourseStipend };
