const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const router = express.Router();
const UserModel = require("../models/Users.js");

dotenv.config();

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.json({ login: false });
  } else {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Token" });
      } else {
        req.email = decoded.email;
        req.avatar = decoded.avatar;
        next();
      }
    });
  }
};

router.get("/", (req, res) => {
  res.json("connected");
});

router.get("/api/test", (req, res) => {
  res.json(new Date());
});

router.post("/api/register", async (req, res) => {
  const { email, password, avatar } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.send("User Already exists!");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        email,
        password: hashedPassword,
        avatar,
      });
      await newUser.save();
      res.send(`${email} is now registered!`);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.send("No user exists");
      // res.json({
      //   message: "No user exists",
      // });
    } else {
      const validatedPassword = await bcrypt.compare(password, user.password);
      if (validatedPassword) {
        const token = jwt.sign(
          { email, avatar: user.avatar },
          process.env.JWT_KEY
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true,
        });
        return res.send("You are now logged in");
        // return res.json({
        //   message: "You are now logged in",
        //   avatar: user.avatar,
        // });
      } else {
        // res.json({
        //   message: "Wrong Password",
        // });
        return res.send("Wrong Password");
      }
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/api/verify", verifyUser, (req, res) => {
  return res.json({ login: true, email: req.email, avatar: req.avatar });
});

router.get("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    partitioned: true,
  });
  return res.send("You are now logged out");
});

module.exports = router;
