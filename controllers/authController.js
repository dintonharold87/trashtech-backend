const passport = require('passport');
const bcrypt = require('bcrypt');
const { Admin } = require('../models/adminModel');
const { Client } = require('../models/clientModel');

// Handle user login
exports.login = (req, res, next) => {
  passport.authenticate('local', async (err, { user }, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ error: info.message });
    }
    bcrypt.compare(req.body.password, user.password, async (err, isMatch) => {
      if (err) {
        return next(err);
      }
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const { role } = req.body;
      if (!role) {
        return res.status(400).json({ error: 'Role is required' });
      }

      let isValidRole = false;
      if (role === 'admin' && user instanceof Admin) {
        isValidRole = true;
      } else if (role === 'client' && user instanceof Client) {
        isValidRole = true;
      }

      if (!isValidRole) {
        return res.status(400).json({ error: 'Invalid role for this user' });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res
          .status(200)
          .json({ message: `${role} logged in successfully` });
      });
    });
  })(req, res, next);
};

// Handle user logout
exports.logout = (req, res) => {
   req.session.destroy((err) => {
     if (err) {
       console.log(err);
     }
     // Logout successful, send response
     res.sendStatus(200);
   });
};
