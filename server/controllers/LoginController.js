const { userAuthentication } = require("../services/LoginService");
const { createToken } = require("../config/VerifyToken");

const userLogin = async (req, res) => {
  try {
    const { userId, password, role } = req.body;

    const result = await userAuthentication({ userId, password, role });
    console.log("Authentication result:", result);

    if (!result.success) return res.status(400).json({ error: result.message });

    const token = await createToken({ userId, role });
    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 3600000 });

    console.log("Login successful, cookie set");
   return res.status(200).json({ success: true, message: "Login successful", user: result.user });

  } catch (err) {
    console.error("User Login failed:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const verifyUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};




module.exports = { userLogin ,verifyUser};
