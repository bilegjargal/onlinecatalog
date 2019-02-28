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
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  req.db = db;
  next();
});

//2. login
app.post("/login", async (req, res) => {
  let user = undefined;
  await req.db.model("user")
    .find({ username: req.body.uname }).forEach(data => {
      if (compare(req.body.password, data.password))
        user = data;
    });
  if (user) {
    const token = jwt.sign({
      name: user.username,
    }, "secret", { expiresIn: "2h" });
    res.header('Authorization', `Bearer ${token}`);
    res.json({ success: true, token: token });
  }
  res.json({ success: false });
});

app.listen(8080, () => console.log("server started listening on 8080"));