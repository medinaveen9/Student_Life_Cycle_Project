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

// Insert Stipend details
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

    if(data.isModified === "true") {
      const updateLeavesQuery = ` UPDATE stipend_data  SET leaves = $1
        WHERE roll_no = $2 `;
      await pool.query(updateLeavesQuery, [(data.total_leaves - data.requested_leaves), data.rollNo]);
    }

    // If editing an existing record
    if (data.isEdit && data.id) {
      const query = `
        UPDATE stipend_details SET roll_no=$1, name=$2, course=$3, account_no=$4, doj=$5,
        leaves=$6, present=$7, stipend=$8, actual_stipend=$9, cur_month=$10, requested_leaves=$11,
        ${column_id}=$12, ${column_name}=$13, ifsc_code=$14, year=$15 WHERE id=$16
      `;
      await pool.query(query, [
        data.rollNo, data.name, data.course, data.accountNo, data.joiningDate,
        data.leavesBalance, data.presentAndHolidays, data.stipend, data.actualStipend,
        data.cur_month || null, data.requested_leaves || 0, data.userId || null, data.user_name || null,
        data.ifsc_code || null, data.year || null, data.id
      ]);
      return;
    }

    // Check if record already exists
    const existingRecord = await pool.query(
      `SELECT * FROM stipend_details WHERE roll_no = $1 AND cur_month = $2`,
      [data.rollNo, data.cur_month]
    );

    if (existingRecord.rows.length > 0) {
      const updateRes = await pool.query(
        `UPDATE stipend_details SET 
          name = $1, course = $2, account_no = $3, doj = $4, leaves = $5, 
          present = $6, stipend = $7, actual_stipend = $8, requested_leaves = $9,
          ${column_id} = $10, ${column_name} = $11, ifsc_code = $12, year = $13
        WHERE roll_no = $14 AND cur_month = $15`,
        [
          data.name, data.course, data.accountNo, data.joiningDate, data.leavesBalance,
          data.presentAndHolidays, data.stipend, data.actualStipend, data.requested_leaves || 0,
          data.userId || null, data.user_name || null,
          data.ifsc_code, data.year, data.rollNo, data.cur_month
        ]
      );

      if (updateRes.rowCount > 0) {
        return;
      }
    }

    // Insert new record
    const query = `
        INSERT INTO stipend_details 
          (roll_no, name, course, account_no, doj, leaves, present, stipend, actual_stipend, 
          cur_month, requested_leaves, ${column_id}, ${column_name}, ifsc_code, year)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      `;

      await pool.query(query, [
        data.rollNo, data.name, data.course, data.accountNo, data.joiningDate,
        data.leavesBalance, data.presentAndHolidays, data.stipend, data.actualStipend,
        data.cur_month || null, data.requested_leaves || 0,
        data.userId || null, data.user_name || null,
        data.ifsc_code, data.year
      ]);

  } catch (error) {
    console.error('Error inserting stipend details:', error.message);
    throw error;
  }
};

// Fetch all stipends
const fetchAllStipends = async (role, month, course, year, roll_no) => {
  try {
    let params = [];
    let conditions = [];

    // Month filter
    if (month !== "All") {
      conditions.push(`sd.cur_month = $${params.length + 1}`);
      params.push(month);
    }

    // Course filter
    if (course !== "All") {
      conditions.push(`sd.course = $${params.length + 1}`);
      params.push(course);
    }

    // Year filter
    if (year !== "All") {
      conditions.push(`sd.year = $${params.length + 1}`);
      params.push(year);
    }

    // Roll No filter
    if (roll_no && roll_no !== "") {
      conditions.push(`sd.roll_no = $${params.length + 1}`);
      params.push(roll_no);
    }

    // Base query (role-based)
    let query = `
      SELECT sd.*, sdata.leaves AS bal_leaves
      FROM stipend_details sd
      LEFT JOIN stipend_data sdata ON sd.roll_no = sdata.roll_no
    `;

    if (role === "Verifier") {
      conditions.push(`sd.checker_status = 'approved'`);
    } else if (role === "Approver" || role === "FA" || role === "FC") {
      conditions.push(`sd.checker_status = 'approved' AND sd.verifier_status = 'approved'`);
    }

    // Add conditions
    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    const result = await pool.query(query, params);
    return result.rows;
  } catch (err) {
    console.error("Error fetching stipends in service:", err.message);
    throw err;
  }
};


const stipendApprovalStatus = async (id, status, role, userInfo) => {
  try {
    if (role === 'Checker') {
      const result = await pool.query(
        'UPDATE stipend_details SET checker_status = $1 WHERE id = $2',
        [status, id]
      );
      return result.rowCount > 0;
    } else if (role === 'Verifier') {
      const result = await pool.query(
        'UPDATE stipend_details SET verifier_status = $1, verifier_id = $2, verifier_name = $3 WHERE id = $4',
        [status, userInfo.userId, userInfo.user_name, id]
      );
      return result.rowCount > 0;
    } else if (role === 'Approver') {
      const result = await pool.query(
        'UPDATE stipend_details SET approver_status = $1, approver_id = $2, approver_name = $3 WHERE id = $4',
        [status, userInfo.userId, userInfo.user_name, id]
      );
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

const stipendBulkApproval = async (data, status, role, userInfo) => {
  try {
    if (role === 'Checker') {
      for (let id of data) {
        const result = await pool.query('update stipend_details set checker_status = $1 WHERE id = $2', [status, id]);
      }
      return true;
    } else if (role === 'Verifier') {
        for (let id of data) {
          const result = await pool.query(
            'UPDATE stipend_details SET verifier_status = $1, verifier_id = $2, verifier_name = $3 WHERE id = $4',
            [status, userInfo.userId, userInfo.user_name, id]
          );
        }
        return true;
      } else if (role === 'Approver') {
          for (let id of data) {
            const result = await pool.query(
              'UPDATE stipend_details SET approver_status = $1, approver_id = $2, approver_name = $3 WHERE id = $4',
              [status, userInfo.userId, userInfo.user_name, id]
            );
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

//Add student leaves
const studentLeaveService = async(data) => {
  const { roll_no, name, course, total_leaves } = data;

  try {
    // 1. Check if student exists
    const studentRes = await pool.query(
      "SELECT * FROM stipend_data WHERE roll_no = $1",
      [roll_no]
    );

    if (studentRes.rows.length > 0) {
      // 2a. Update existing student
      await pool.query(
        "UPDATE stipend_data SET name = $1, course = $2, leaves = $3 WHERE roll_no = $4",
        [name, course, total_leaves, roll_no]
      );
      return { message: "Student details updated successfully" };
    } else {
      // 2b. Insert new student
      await pool.query(
        "INSERT INTO stipend_data (roll_no, name, course, leaves) VALUES ($1, $2, $3, $4)",
        [roll_no, name, course, total_leaves]
      );
      return { message: "Student added successfully" };
    }
  } catch (err) {
    console.error("Error adding/updating student leaves:", err.message);
    throw err;
  }
};

module.exports = { getStudentDetails, insertStipendDetails, fetchAllStipends, 
  stipendApprovalStatus, stipendBulkApproval, addCourseStipend, studentLeaveService };
