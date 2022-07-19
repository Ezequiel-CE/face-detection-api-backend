const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation } = require("../utils/validation");
const User = require("../models/User.model");

const resgiterUser = async (req, res) => {
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
      { id: savedUser.id, email: savedUser.mail },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      user: {
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.mail,
      },
      token,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const loginUser = (req, res) => {
  const { user: userData } = req;
  const token = jwt.sign(
    { id: userData.id, email: userData.mail },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.status(200).json({
    success: true,
    userData,
    token,
  });
};

//check if user is valid

const isValidUser = async (req, res) => {
  const { user } = req;
  try {
    const findUser = await User.findOne({
      where: { mail: user.email },
    });

    if (!user) {
      return done(null, false);
    }

    const { dataValues: userData } = findUser;

    delete userData.password;
    delete userData.id;
    res.status(200).json({
      success: true,
      message: `welcome back ${userData.username}`,
      userData,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "user dont exist",
      userData,
    });
  }
};

module.exports = { resgiterUser, loginUser, isValidUser };
