const validator = require('validator')
const bcrypt = require("bcrypt");
const User = require('../model/User')
const { handleErr } = require('../helpers/handleErr');
const { createToken } = require('../helpers/jwtAuth');

const getUser = async (req, res) => {
  const users = await User.find();
  res.json({
    results: users.length,
    data: users,
    success: true
  })
}

const check = async (req, res) => {
  const { email, owner } = req.body;
  res.status(201).json({
    results: 0,
    data: {
      email, userName: owner,
    },
    success: true
  });
  return
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if fields are correct
    const isEmail = validator.isEmail(email);
    const checkPsw = password.length < 6;
    if (!isEmail) throw Error("Invalid Email");
    if (checkPsw) throw Error("Invalid password");

    const user = await User.findOne({ email })
    if (!user) throw Error("Incorrect Email");
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) throw Error("Incorrect Password");
    const userName = `${user.firstName} ${user.lastName}`;

    const token = createToken({ email, userName });
    res.cookie('jwt', token, { maxAge: 60 * 60 * 1000, sameSite: 'strict' });
    res.status(201).json({
      results: 0,
      data: {
        email, userName,
      },
      success: true
    });
  } catch (err) {
    console.log(err)
    const error = handleErr(res, err);
    res.json({
      results: 0,
      data: {
        error
      },
      success: false
    });
  }
}

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // check if fields are correct
    const isEmail = validator.isEmail(email);
    const checkPsw = password.length < 6;
    if (!isEmail) throw Error("Invalid Email");
    if (checkPsw) throw Error("Invalid password");

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    // if no error save user in db
    await User.create({
      firstName, lastName, email, password: hashedPassword
    })

    const userName = `${firstName} ${lastName}`;
    // create jwt and send it to user as cookie
    const token = createToken({ email, userName });
    res.cookie('jwt', token, { maxAge: 60 * 60 * 1000, sameSite: 'strict' });

    res.status(201).json({
      results: 0,
      data: {
        email, userName
      },
      success: true
    });
  } catch (err) {
    const error = handleErr(res, err);
    res.json({
      results: 0,
      data: {
        error
      },
      success: false
    });
  }
}

const logout = (req, res) => {
  res.clearCookie("jwt");
  res.sendStatus(200);
}

module.exports = { check, getUser, login, signup, logout }