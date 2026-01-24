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

const getStudentDetails = async (application_no, selectedMonth) => {
  try {
    const result = await pool.query(
      `SELECT * FROM students WHERE roll_no = $1`, [application_no] );

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
    const stipendHistoryResult = await pool.query(
      `SELECT * FROM stipend_details
       WHERE roll_no = $1 AND year = $2 AND cur_month = $3
       ORDER BY cur_month DESC`,
      [application_no, student.year, selectedMonth]
    );
    if(stipendHistoryResult.rows.length > 0) {
      let requested_leaves = stipendHistoryResult.rows[0].requested_leaves;
      student.leaves_used -= requested_leaves;
    }
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
      const updateLeavesQuery = ` UPDATE students  SET leaves = $1
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
        const requestedLeaves = Number(data.requested_leaves) || 0;
        const totalLeaves = Number(data.total_leaves) || 0;
        const availableLeaves = Number(data.available_leaves) || 0;
        if (requestedLeaves > 0) {
          await pool.query(
        `UPDATE students SET leaves_used = $1 WHERE roll_no = $2`,
        [(totalLeaves - availableLeaves + requestedLeaves), data.rollNo]
          );
        }
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

    // Update students.leaves_used by requested_leaves for this roll_no
    const requestedLeaves = Number(data.requested_leaves) || 0;
    const totalLeaves = Number(data.total_leaves) || 0;
    const availableLeaves = Number(data.available_leaves) || 0;
    if (requestedLeaves > 0) {
      await pool.query(
      `UPDATE students SET leaves_used = $1 WHERE roll_no = $2`,
      [(totalLeaves - availableLeaves + requestedLeaves), data.rollNo]
      );
    }

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
    } else if (role === "Approver") {
      conditions.push(`sd.checker_status = 'approved' AND sd.verifier_status = 'approved'`);
    } else if (role === "FA" || role === "FC") {
      conditions.push(`sd.approver_status = 'approved'`);
    }

    // Add conditions
    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    // Sort by roll_no
    query += ` ORDER BY sd.roll_no ASC`;

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
      "SELECT * FROM students WHERE roll_no = $1",
      [roll_no]
    );

    if (studentRes.rows.length > 0) {
      // 2a. Update existing student
      await pool.query(
        "UPDATE students SET leaves = $1 available_leaves = $2 WHERE roll_no = $3",
        [total_leaves, total_leaves, roll_no]
      );
      return { message: "Student details updated successfully" };
    } else {
        return { message: "Student Not Found" };
    }
  } catch (err) {
    console.error("Error adding/updating student leaves:", err.message);
    throw err;
  }
};

const autoFillStipendData = async (course, month, userId, user_name) => {
  try {
    const year = new Date().getFullYear();
    const totalDays = new Date(year, month, 0).getDate();

    // 1️⃣ Get students
    const studentQuery =
        course === "All"
          ? `SELECT * FROM students
            WHERE CAST(year AS INTEGER) <= 4
              AND account_no IS NOT NULL
              AND TRIM(account_no) <> ''`
          : `SELECT * FROM students
            WHERE course = $1
              AND CAST(year AS INTEGER) <= 4
              AND account_no IS NOT NULL
              AND TRIM(account_no) <> ''`;
    const studentsRes = await pool.query(studentQuery, course === "All" ? [] : [course]);
    const students = studentsRes.rows;
    if (students.length === 0) return 0;

    // 2️⃣ Get existing stipend records for this month/year
    const rollNos = students.map(s => s.roll_no);
    const existingRes = await pool.query(
      `SELECT roll_no FROM stipend_details WHERE cur_month=$1 AND roll_no = ANY($2)`,
      [month, rollNos]
    );
    const existingRolls = new Set(existingRes.rows.map(r => r.roll_no));

    // 3️⃣ Fetch stipend per student course + academic year
    const stipendMap = {}; // key = course_year
    for (const s of students) {
      const key = `${s.course}_${s.year}`;
      if (stipendMap[key] !== undefined) continue;

      const stipendRes = await pool.query(
        `SELECT stipend 
         FROM course_stipend
         WHERE course=$1 AND year=$2
           AND ((to_date IS NULL AND from_date <= CURRENT_DATE)
             OR (to_date IS NOT NULL AND from_date <= CURRENT_DATE AND to_date >= CURRENT_DATE))
         ORDER BY from_date DESC LIMIT 1`,
        [s.course, s.year]
      );

      stipendMap[key] = stipendRes.rows[0]?.stipend || 0;
    }

    // 4️⃣ Prepare bulk insert values
    const insertValues = [];
    const params = [];
    let paramIndex = 1;

    students.forEach(s => {
      if (existingRolls.has(s.roll_no)) return; // skip existing

      insertValues.push(
        `($${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++})`
      );

      const stipendVal = stipendMap[`${s.course}_${s.year}`] || 0;

      params.push(
        s.roll_no,
        s.name,
        s.course,
        s.account_no,
        s.doj,
        0,               // leaves
        totalDays,       // present
        stipendVal,
        stipendVal,
        month,
        0,               // requested_leaves
        s.ifsc_code,
        s.year,
        userId,
        user_name
      );
    });

    if (insertValues.length === 0) return 0;

    // 5️⃣ Bulk insert
    const insertQuery = `
      INSERT INTO stipend_details 
        (roll_no, name, course, account_no, doj, leaves, present, stipend, actual_stipend,
         cur_month, requested_leaves, ifsc_code, year, checker_id, checker_name)
      VALUES ${insertValues.join(", ")}
    `;
    await pool.query(insertQuery, params);

    return insertValues.length;

  } catch (err) {
    console.error("Error in autoFillStipendData:", err.message);
    throw err;
  }
};

// Delete stipend data
const deleteStipendData = async (course, month) => {
  try {
    const year = new Date().getFullYear();

    const deleteQuery =
      course === "All"
        ? `DELETE FROM stipend_details 
          WHERE cur_month = $1 
          AND CAST(year AS INTEGER) <= 4`
        : `DELETE FROM stipend_details 
          WHERE cur_month = $1 
          AND course = $2 
          AND CAST(year AS INTEGER) <= 4`;

        const params = course === "All" ? [month] : [month, course];

    const result = await pool.query(deleteQuery, params);
    return result.rowCount;
  } catch (err) {
    console.error("Error in deleteStipendData:", err.message);
    throw err;
  }
};

// services/student.service.js
const addStudentService = async (data) => {
  try {
    const { roll_no } = data;

    // Check duplicate roll_no
    const exists = await pool.query(
      `SELECT 1 FROM students WHERE roll_no = $1`,
      [roll_no]
    );
    if (exists.rowCount > 0) {
      throw { code: "ROLL_EXISTS", message: "Roll number already exists" };
    }

    // Auto-build insert query
    const fields = Object.keys(data);
    const values = Object.values(data);
    const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");

    const insertQuery = `
      INSERT INTO students (${fields.join(", ")})
      VALUES (${placeholders})
      RETURNING id
    `;

    const result = await pool.query(insertQuery, values);
    return result.rows[0].id;

  } catch (err) {
    console.error("Add Student Error:", err);
    throw err;
  }
};

// Add or Update student
const addOrUpdateStudentService = async (data) => {
  try {
    const { roll_no } = data;

    // Check if student exists
    const exists = await pool.query(`SELECT id FROM students WHERE roll_no = $1`, [roll_no]);

    if (exists.rowCount > 0) {
      // 🔄 Student exists → update
      const fields = Object.keys(data);
      const values = Object.values(data);

      // Build update query dynamically
      const setQuery = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
      const updateQuery = `UPDATE students SET ${setQuery} WHERE roll_no = $${fields.length + 1} RETURNING id`;

      const result = await pool.query(updateQuery, [...values, roll_no]);
      return { id: result.rows[0].id, updated: true };

    } else {
      // ➕ Student does not exist → insert
      const fields = Object.keys(data);
      const values = Object.values(data);
      const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");

      const insertQuery = `
        INSERT INTO students (${fields.join(", ")})
        VALUES (${placeholders})
        RETURNING id
      `;

      const result = await pool.query(insertQuery, values);
      return { id: result.rows[0].id, updated: false };
    }

  } catch (err) {
    console.error("Add/Update Student Error:", err);
    throw err;
  }
};

// Delete student by roll_no
const deleteStudent = async (roll_no) => {
    const result = await pool.query(
      "DELETE FROM students WHERE roll_no = $1 RETURNING *",
      [roll_no]
    );

    if (result.rowCount === 0) {
      throw new Error("Student not found");
    }

    return result.rows[0];
};

const fetchStudentsByFilter = async (course, batchYear, currentYear) => {
  const query = `
    SELECT id, roll_no, name, course, batch_year AS "batchYear", year
    FROM students
    WHERE course = $1 AND batch_year = $2 AND year = $3
    ORDER BY roll_no ASC;
  `;
  const { rows } = await pool.query(query, [course, batchYear, currentYear]);
  return rows;
};

// Promote selected students
const promoteStudentsService = async (studentIds, nextYear, newDOJ) => {
  const query = `
    UPDATE students
    SET year = $1, doj = $2
    WHERE id = ANY($3::int[])
    RETURNING id;
  `;
  
  const { rows } = await pool.query(query, [nextYear, newDOJ, studentIds]);
  return rows.length;
};

// Delete student stipend record from stipend details table
const deleteStudentStipendById = async (id) => {
  try {
    const query = `DELETE FROM stipend_details WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result;
  } catch (error) {
    console.error("Service Error: deleteStudentStipendById", error);
    throw error; // important: propagate to controller
  }
};

// Update leaves and present days in stipend_details
const updateLeavesAndPresent = async ({ id, leaves, present, userInfo }) => {

  // 1. Fetch existing row
  const existing = await pool.query(
    "SELECT leaves, present FROM stipend_details WHERE id = $1", [id] );

  if (existing.rowCount === 0) {
    throw new Error("Record not found");
  }

  // 2. Update DB
  const updateResult = await pool.query(
    "UPDATE stipend_details SET leaves=$1, present=$2, checker_id=$3, checker_name=$4 WHERE id=$5 RETURNING *",
    [leaves, present, userInfo?.userId || null, userInfo?.user_name || null, id]
  );

  return updateResult.rows[0];
};



module.exports = { getStudentDetails, insertStipendDetails, fetchAllStipends, autoFillStipendData, 
  stipendApprovalStatus, stipendBulkApproval, addCourseStipend, studentLeaveService , deleteStipendData,
  promoteStudentsService, addStudentService, fetchStudentsByFilter, deleteStudent, 
  addOrUpdateStudentService, deleteStudentStipendById, updateLeavesAndPresent};
