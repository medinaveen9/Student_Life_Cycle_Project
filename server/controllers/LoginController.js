const { userAuthentication } = require("../services/LoginService");
const { createToken } = require("../config/VerifyToken");

// Controller for user login
const userLogin = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const result = await userAuthentication({ userId, password });

    if (!result.success) return res.status(400).json({ error: result.message });

    const token = await createToken({ userId, user_name : result.user.user_name, role: result.user.role });
    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 3600000 });

    console.log("Login successful, cookie set");
    return res.status(200).json({ success: true, message: "Login successful", user: result.user });

  } catch (err) {
    console.error("User Login failed:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to verify user from token
const verifyUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};

// Controller for user logout
const userLogout = async (req, res) => {
    try {
        // Clear the cookie (e.g., "token")
        res.clearCookie('token', { httpOnly: true,  secure: true, sameSite: 'Strict',  });
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout Error:', error);
        return res.status(500).json({ message: 'Something went wrong during logout' });
    }
};

module.exports = { userLogin ,verifyUser, userLogout};
