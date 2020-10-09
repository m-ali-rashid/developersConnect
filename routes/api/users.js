const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
//All rules of validation like isEmail, isEmpty, not, isLength
//is available in the documentation of express-validator

const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");

// @route   POST api/users
// @desc    Register user
// @access  Public (we wont need JSON WEB TOKEN for Public Route)
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Pleas include Valid Email").isEmail(),
    check(
      "password",
      "Please Enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      // Return JsonWebToken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      // res.send("USER REGISTERED");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

//req.body object of data to be sent
//for req.body to work we have to initialize
//the middleware parser

//now bodyparser is included with express
//instead of bodyparser.json we use express.json

// .not.empty => to check if the input data is there
