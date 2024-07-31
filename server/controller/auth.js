const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.postSignup = async (req, res, next) => {
  const { fullname, email, password, phone } = req.query;

  try {
    const hashedPass = await bcrypt.hash(password, 12);
    const user = new User({
      fullname: fullname,
      email: email,
      phone: phone,
      password: hashedPass,
      role: 'client',
      cart: { items: [] },
    });

    const result = await user.save();
    res.status(201).json({ msg: 'New user created', userId: result._id });
  } catch (err) {
    console.log(err);
  }
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: 'User not found!' });
    } else {
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        return res.status(401).json({ message: 'Wrong password!' });
      } else {
        const accessToken = jwt.sign(
          user.toJSON(),
          `${process.env.ACCESS_TOKEN}`
        );
        res.status(200).json({ user: user, accessToken: accessToken });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getName = async (req, res, next) => {
  console.log('get method is run');
  const id = req.params.id;
  console.log(id);
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(401).json({ message: 'User not found!' });
    } else {
      res.status(200).json({ user: user });
    }
  } catch (err) {
    console.log(err);
  }
};
``;
