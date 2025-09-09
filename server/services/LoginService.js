const { pool } = require('../models/db'); // or wherever your pool is exported

const userAuthentication = async ({ userId, password, role }) => {
  try {
    const sql = 'SELECT * FROM users_details WHERE user_id=$1 AND role=$2';
    const result = await pool.query(sql, [userId, role]);

    if (result.rows.length === 0) {
      return { success: false, message: "User not found or role mismatch" };
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return { success: false, message: "Incorrect password" };
    }

    return { success: true, user };
  } catch (err) {
    console.error("DB error:", err);
    return { success: false, message: "Database error" };
  }
};
 module.exports = { userAuthentication };