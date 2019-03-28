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
//TODO: change the json web token secret key
app.post("/login", async function (req, res) {
  let user = undefined;
  await req.conn.db
    .collection("user", function (error, collection) {
      collection.findOne({ "username": req.body.username }, function (err, data) {
        if (err)
          console.log(err);
        if (req.body.password == data.password) { // change it later by using bcrypt
          user = data;
        }
        if (user) { //if user is found
          const token = jwt.sign({
            username: user.username,
          }, "secretkey", { expiresIn: "2h" });
          res.header('Authorization', `Bearer ${token}`);
          res.json({ success: true, token: token });
        } else {
          console.log("false", user);
          res.json({ success: false });
        }
      });
      if (error) {
        console.log(error);
      }
    });
});

//3. create new catalog
//TODO: save token to localStorage
app.post("/admin/new-catalog", async function (req, res) {
  let token = req.query.tok;
  let username;
  jwt.verify(token, "secretkey", await function (err, decoded) {
    if (err) {
      console.log("####ERROR:");
    } else {
      username = decoded.username;
    }
  });
  console.log(username);
  let query = {
    $set: {
      "title": req.body.title,
      "info": req.body.info,
      "createdBy": username,
      "createdAt": new Date(),
    }
  };
  req.conn.db.collection("catalog", function (err, collection) {
    collection.findOneAndUpdate(
      { "title": req.body.title },
      query,
      { "upsert": true, new: true },
      function (err, data) {
        if (err) {
          res.json({ success: false, errMessage: err });
          console.log("####ERROR:", err);
        } else {
          console.log(query);
          res.json({ success: true });
        }
      });

  });
});

app.listen(8080, () => console.log("server started listening on 8080"));