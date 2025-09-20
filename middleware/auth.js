const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    if (req.session.userId) {
      res.locals.user = await User.findById(req.session.userId);
    } else {
      res.locals.user = null;
    }
    next();
  } catch (err) {
    console.log(err);
    res.locals.user = null;
    next();
  }
};
