const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const { extend } = require("lodash");

router.route("/signup").post(async (req, res) => {
  try {
    const userData = req.body;

    const user = await User.findOne({ email: userData.email });

    if (!user) {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      return res.status(201).json({ success: true, user: savedUser });
    }

    return res.json({
      success: false,
      message:
        "Account already exists with entered email, kindly use different email for signup.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Couldn't register user, kindly check the error message for more details.",
      errorMessage: error.message,
    });
  }
});

router.route("/authenticate").post(async (req, res) => {
  try {
    const email = req.get("email");
    const password = req.get("password");

    const user = await User.findOne({ email });

    if (user && user.password === password) {
      return res
        .status(200)
        .json({ success: true, userId: user._id, firstName: user.firstname });
    } else if (!user) {
      return res.json({
        success: false,
        message:
          "This email is not registered with us. Kindly visit signup page and create a new account.",
      });
    }
    return res.json({
      success: false,
      message:
        "Incorrect email or password kindly login with correct credentials.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Couldn't validate user credentials, kindly check the error message for more details",
      errorMessage: error.message,
    });
  }
});

router.param("email", async (req, res, next, email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No user found with entered email." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Couldn't find user with entered email, kindly check the error message for more details",
      errorMessage: error.message,
    });
  }
});

router
  .route("/:email")
  .get(async (req, res) => {
    try {
      const { user } = req;
      res.json({ success: true, user });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Couldn't fetch user details, kindly check the error message for more details.",
        errorMessage: error.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      let { user } = req;
      const userUpdates = req.body;
      user = extend(user, userUpdates);
      const updatedUser = await user.save();
      res.status(201).json({ success: true, updatedUser });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Couldn't update user details, kindly check the error message for more details",
        errorMessage: error.message,
      });
    }
  });

module.exports = router;
