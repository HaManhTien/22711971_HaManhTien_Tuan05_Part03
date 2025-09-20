const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.showRegister = (req, res) => res.render('register');
exports.showLogin = (req, res) => res.render('login');
exports.showForgot = (req, res) => res.render('forgot');

exports.register = async (req, res) => {
  const { username, email, phone, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, email, phone, password: hashed });
  await user.save();
  req.session.userId = user._id;
  res.redirect('/');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.send('Không tìm thấy user');
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send('Sai mật khẩu');
  req.session.userId = user._id;
  res.redirect('/');
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send(err);
    res.redirect('/');
  });
};

exports.forgot = (req, res) => {
  res.send('Chức năng quên mật khẩu chưa triển khai');
};
