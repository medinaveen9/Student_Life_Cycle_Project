const { pool } = require('../models/db'); // or wherever your pool is exported
const bcrypt = require('bcrypt');
const crypto = require("crypto") ;
const nodemailer = require("nodemailer");
require('dotenv').config(); 


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

// Function to change password
const changePasswordService = async (userId, oldPassword, newPassword) => {
  try {
    const userQuery = "SELECT * FROM users_details WHERE user_id = $1";
    const userResult = await pool.query(userQuery, [userId]);

    if (userResult.rows.length === 0)
      return { success: false, message: "User not found" };

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch)
      return { success: false, message: "Old password is incorrect" };

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users_details SET password = $1 WHERE user_id = $2", [hashedPassword, userId]);

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.error("Password change failed:", error);
    return { success: false, message: "Database error" };
  }
};

const forgotPasswordService = async (email, userId) => {
  // Check if user exists
  const result = await pool.query("SELECT * FROM users_details WHERE user_id = $2 AND email = $1", [email, userId]);
  if (result.rowCount === 0) {
    throw new Error("User not found");
  }

  const user = result.rows[0];

  // Generate a token (valid for 1 hour)
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins from now

  // Save token and expiration in DB
  await pool.query(
    "UPDATE users_details SET reset_token = $1, reset_token_expiry = $2 WHERE user_id = $3 AND email = $4",
    [token, expires, userId, email]
  );

  // Send reset link via email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `<p>Hello ${user.user_name},</p>
           <p>Click the link below to reset your password:</p>
           <a href="${resetLink}">${resetLink}</a>
           <p>The link is valid for 10 minutes.</p>`,
  });

  return true;
};

//Reset password
const resetPasswordService = async (token, newPassword) => {
  // Check if token exists and not expired
  const result = await pool.query(
    "SELECT * FROM users_details WHERE reset_token = $1 AND reset_token_expiry > NOW()",
    [token]
  );

  if (result.rowCount === 0) {
    throw new Error("Invalid or expired token");
  }

  const user = result.rows[0];

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password and remove token
  await pool.query(
    `UPDATE users_details 
     SET password = $1, reset_token = NULL, reset_token_expiry = NULL 
     WHERE user_id = $2`,
    [hashedPassword, user.user_id]
  );

  return true;
};

 module.exports = { userAuthentication, changePasswordService, forgotPasswordService, resetPasswordService};