const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require('axios')

const JWT_SECRET = "aosiSfoiHaisfDvma93Gy59mbaTRmmh9aJmHRh82698mvsihvk";

mongoose
  .connect("mongodb://0.0.0.0/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch(() => {
    console.log("Failed to connect to database");
  });
const app = express();


app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());


app.post("/api/register", async (req, res) => {
  const { username, password: plainTextPassword } = req.body;
  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }
  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password must have at least 6 characters!",
    });
  }
  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({ username, password });
    console.log("User created successfully", response);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ stauts: "error", error: "Username already taken" });
    }
    throw error;
  }
  res.json({ status: "ok" });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();
  if (!user) {
    return res.json({ status: "error", error: "Invalid username" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      JWT_SECRET
    );

    return res.json({ status: "ok", token: token });
  } else {
    return res.json({ status: "error", error: "Invalid Password" });
  }
});

app.listen(3000, () => {
  console.log("Server Connected");
});
