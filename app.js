const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const config = require("./dotenv");

app = express();

//1. mongoose
mongoose.connect(config.config.dbConnection, { useNewUrlParser: true },
  function (err, client) {
    if (err) console.log(err);
  });
let db = mongoose.connection;

//setups
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  req.db = db;
  next();
});

//mongoose schema
var userSchema = new mongoose.Schema({
  username: String,
  password: String
});
var User = mongoose.model("user", userSchema);

//2. login
app.post("/login", async function (req, res) {

  let user = undefined;
  await User.find({ username: req.body.uname }, null, function (err, data) {
    console.log(data);
    if (err)
      console.log(err);
    user = data;
    console.log("user data: ", data);
  });

  console.log("gg");
  if (user) {
    const token = jwt.sign({
      name: user.username,
    }, "secret", { expiresIn: "2h" });
    res.header('Authorization', `Bearer ${token}`);
    res.json({ success: true, token: token });
  } else {
    res.json({ success: false });
  }
});

app.listen(8080, () => console.log("server started listening on 8080"));