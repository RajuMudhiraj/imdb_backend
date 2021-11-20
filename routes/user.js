const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/verifyToken')


//importing User model
const User = require("../models/User")

// Getting all users from users table
router.get('/', verifyToken, (req, res) => {
  User.findAll()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({ Error: err + " Something went wrong while getting Users" })
    })
});

// Handling POST request to /signUp
router.post('/signup', (req, res) => {
  User.findAll({ where: { email: req.body.email } })
    .then(result => {
      if (result.length >= 1) {
        console.log(result.length)
        res.status(200).json({ message: "User already exists." })
      }
      else {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
          if (err) {
            res.status(500).json({ Error: err + " Something went wrong while hashing password" })
          }
          if (hash) {
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash
            }
            User.create(user)
              .then(result => {
                res.status(201).json(result)
              })
              .catch(err => {
                res.status(500).json({ Error: err + " Something went wrong while creating user." })
              })
          }

        });

      }
    })
    .catch(err => {
      res.status(500).json({ Error: err + " Something went wrong while finding user." })
    })
})


// Handling POST request to /signIn
router.post('/signin', (req, res) => {
  User.findAll({ where: { email: req.body.email } })
    .then(result => {
      // console.log(result[0].dataValues.id)
      bcrypt.compare(req.body.password, result[0].dataValues.password, (err, response) => {
        if (err) {
          res.status(401).json({
            Error: err + ' Failed to compare passwords..'
          })
        }
        if (response) {
          console.log(response)
          const token = jwt.sign({
            email: result[0].dataValues.email,
            userId: result[0].dataValues.id,
            isAdmin: result[0].dataValues.isAdmin,
            name: result[0].dataValues.name
          },
            process.env.SECRET,
            {
              expiresIn: "1h"

            })
          res.status(200).json({
            message: "Auth successful",
            token: token,

          })
        };
      })
    })
    .catch(err => {
      res.status(500).json({ Error: err + " Something went wrong while finding user." })
    })
})


module.exports = router;