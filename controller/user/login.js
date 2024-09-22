const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) res.status(400).json({ message: "Invalid Login Credentials" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) res.status(400).json({ message: "Invalid Login Credentials" });
    else {
      const payload = {
        role: user.role,
        username: user.username,
        email: user.email,
        id: user.user_id,
      };
      const key = process.env.key;
      if (!key) {
        return res
          .status(500)
          .json({
            error: "JWT secret key is missing from environment variables",
          });
      }
      const token = jwt.sign(payload, key, {
        algorithm: "HS256",
        expiresIn: "1h",
      });
      res.status(200).json({ success: "true", token });
    }
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({
        error: "Some error occured while login ",
        errorMessage: err.message,
      });
  }
};

module.exports = login;
