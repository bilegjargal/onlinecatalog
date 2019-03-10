const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const config = require("./dotenv");

app = express();

//0. mongoose
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
  req.conn = db;
  next();
});

//1.create user
app.post("/signup", function (req, res) {
  let query = { $set: { "username": req.body.username, "password": req.body.password } };
  req.conn.db.collection("user", function (err, collection) {
    collection.findOneAndUpdate(
      { "username": req.body.username },
      query,
      { "upsert": true, new: true },
      function (err, data) {
        if (err) {
          res.json({ success: false, errMessage: err });
          console.log("####ERROR:", err);
        } else {
          res.json({ success: true });

        }
      }
    );
  });
});

//2. login
app.post("/login", async function (req, res) {
  let user = undefined;
  await req.conn.db
    .collection("user", function (err, collection) {
      collection.findOne({ "username": req.body.username }, function (err, data) {
        if (err)
          console.log(err);
        if (req.body.password == data.password) { // change it later by using bcrypt
          console.log("user is valid", data.password);
          user = data;
        }
        if (user) { //if user is found
          const token = jwt.sign({
            name: user.username,
          }, "secret", { expiresIn: "2h" });
          res.header('Authorization', `Bearer ${token}`);
          res.json({ success: true, token: token });
        } else {
          console.log("false", user);
          res.json({ success: false });
        }
      });
    });
});


app.post("/new-article", function (req, res) {
  let query = { $set: { "title": req.body.title, "info": req.body.info } };
  req.conn.db.collection("articles", function (err, colleciton) {
    collection.findOneAndUpdate(
      { "title": req.body.title },
      query,
      { "upsert": false, new: true },
      function (err, data) {
        if (err) {
          res.json({ success: false, errMessage: err });
          console.log("####ERROR:", err);
        } else {
          res.json({ success: true });
        }
      });
  });
});

app.listen(8080, () => console.log("server started listening on 8080"));