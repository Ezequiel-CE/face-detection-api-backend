const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation } = require("../utils/validation");
const User = require("../models/User.model");

const resgiterUSer = async (req, res) => {
  //validation
  const { error, value } = registerValidation(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    //search if the mail exist in db
    const emailExist = await User.findOne({ where: { mail: value.email } });

    if (emailExist) {
      return res
        .status(200)
        .json({ success: false, message: "email already taken" });
    }

    //hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    //save in db

    const savedUser = await User.create({
      firstName: value.firstName,
      lastName: value.lastName,
      username: value.username,
      mail: value.email,
      password: hashedPassword,
    });

    //create tokjen

    const token = jwt.sign(
      { id: savedUser.id, mail: savedUser.mail },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log(emailExist);

    res.status(200).json({
      success: true,
      message: `user created with mail: ${savedUser.mail}`,
      token,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { resgiterUSer };
