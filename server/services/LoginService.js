const { pool } = require('../models/db'); // or wherever your pool is exported
const bcrypt = require('bcrypt');


// Function to authenticate user
const userAuthentication = async ({ userId, password }) => {
  try {
    const sql = 'SELECT * FROM users_details WHERE user_id=$1';
    const result = await pool.query(sql, [userId]);

    if (result.rows.length === 0) {
      return { success: false, message: "User not found or role mismatch" };
    }

    const user = result.rows[0];

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Incorrect password" };
    }

    return { success: true, user };
  } catch (err) {
    console.error("DB error:", err);
    return { success: false, message: "Database error" };
  }
};

 module.exports = { userAuthentication };