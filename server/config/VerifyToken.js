const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const createToken = (payload) => {
  if (!SECRET_KEY) throw new Error("JWT secret is missing!");
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { createToken, verifyToken };
