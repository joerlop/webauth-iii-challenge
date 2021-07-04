const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js")

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
      if (err) {
        res.status(401).json({message: "Invalid credentials"})
      } else {
        next()
      }
    })
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
