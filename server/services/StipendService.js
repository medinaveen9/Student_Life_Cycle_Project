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
  try{
    const result = await pool.query(
      `SELECT * FROM stipend_data WHERE roll_no = $1`,
      [application_no]
    );
    if (result.rows.length === 0) {
      return null; // No student found
    }
    const student = result.rows[0];
    const stipendResult = await pool.query(
      `SELECT * FROM course_stipend WHERE course = $1 and year = $2`,  
      [student.course, student.year]
    );
    student.stipend = stipendResult.rows[0]?.stipend || 0;
    return student;
  }
  catch(error){
    console.error("Error fetching student details:", error.message);
    throw error;
  }
}

const insertStipendDetails = async (data) => {
  try {
    const query = ` INSERT INTO stipend_details 
      (roll_no, name, course, account_no, doj, leaves, present, stipend)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

    await pool.query(query, [
      data.rollNo, data.name, data.course, data.accountNo, data.joiningDate,
      data.leavesBalance, data.presentAndHolidays,  data.stipend, ]);
  } catch (error) {
    console.error('Error inserting stipend details:', error.message);
    throw error;
  }
};

const fetchAllStipends = async () => {
  try {
    const result = await pool.query('SELECT * FROM stipend_details');
    return result.rows;
  } catch (error) {
    console.error('Error fetching stipends in service:', err.message);
    throw error; 
  }
};

module.exports = { getStudentDetails, insertStipendDetails,fetchAllStipends };
