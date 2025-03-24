const User = require("../model/UserModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const isExistingUser = await User.findOne({ username });
    if (isExistingUser) {
      return res.status(400).json({ status: false, msg: "Username is already registered" });
    }

    const isExistingEmail = await User.findOne({ email });
    if (isExistingEmail) {
      return res.status(400).json({ status: false, msg: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: true,
      msg: "User created successfully",
      user: { _id: user._id, username: user.username, email: user.email },
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ status: false, msg: "Server error" });
  }
};

module.exports.login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ status: false, msg: "Username is not registered" });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ status: false, msg: "Password is incorrect" });
      }
  
      const userData = { _id: user._id, username: user.username, email: user.email };
  
      return res.status(200).json({ status: true, msg: "Login successful", user: userData });
  
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ status: false, msg: "Server error" });
    }
  };