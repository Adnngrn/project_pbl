// middleware/authorize.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authorize = (allowedRoles = []) => {
  return async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'No token provided' });

    const token = header.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.id);
      if (!user) return res.status(401).json({ message: 'Invalid token' });

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token invalid or expired' });
    }
  };
};

module.exports = authorize;
