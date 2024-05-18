const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const UserModel = require("../models/Users.js");

router.get("/", (req, res) => {
  res.json("connected");
});

router.get("/api/test", (req, res) => {
  res.json(new Date());
});

router.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.send("User Already exists!");
    } else {
      const newUser = new UserModel({ email, password });
      await newUser.save();
      res.send(`${email} is now registered!`);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/api/login", (req, res) => {
  res.json(new Date());
});

module.exports = router;
