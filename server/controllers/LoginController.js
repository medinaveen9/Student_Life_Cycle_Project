
const { userAuthentication, changePasswordService, forgotPasswordService , resetPasswordService,
  registerUserService
   } = require("../services/LoginService");
const { createToken } = require("../config/VerifyToken");

// Controller for user login
const userLogin = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const result = await userAuthentication({ userId, password });

    if (!result.success) return res.status(400).json({ error: result.message });

    const token = await createToken({ userId, user_name : result.user.user_name, role: result.user.role });
    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 3600000 });

    return res.status(200).json({ success: true, message: "Login successful", user: result.user });

  } catch (err) {
    console.error("User Login failed:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to verify user from token
const verifyUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};

// Controller for user logout
// const userLogout = async (req, res) => {
//     try {
//         // Clear the cookie (e.g., "token")
//         res.clearCookie('token', { httpOnly: true,  secure: true, sameSite: 'Strict',  });
//         return res.status(200).json({ message: 'Logout successful' });
//     } catch (error) {
//         console.error('Logout Error:', error);
//         return res.status(500).json({ message: 'Something went wrong during logout' });
//     }
// };
const userLogout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });

        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout Error:', error);
        return res.status(500).json({ message: 'Something went wrong during logout' });
    }
};

//Change password
const changePassword = async (req, res) => {
  try {
    //added 162 ,163
 const {  oldPassword, newPassword } = req.body;
const userId = req.user.userId;

    if (!userId || !oldPassword || !newPassword)
      return res.status(400).json({ success: false, message: "All fields required" });

    const result = await changePasswordService(userId, oldPassword, newPassword);
    res.status(result.success ? 200 : 400).json(result);

  } catch (err) {
    console.error("Change Password Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email, userId } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    await forgotPasswordService(email, userId);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Something went wrong" });
  }
};

// Reset password controller
const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    await resetPasswordService(token, newPassword);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message || "Invalid token or expired" });
  }
};

const registerController = async (req, res) => {
  try {
    const { userId, password, conformPassword } = req.body;
    if (password !== conformPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const result = await registerUserService({ userId, password });
    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  }
  catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { userLogin ,verifyUser, userLogout, changePassword, forgotPasswordController,
  resetPasswordController, registerController }

