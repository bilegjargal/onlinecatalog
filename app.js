const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const config = require("./dotenv");

let db = null;
app = express();
mongoose.connect(config.config.dbConnection, { useNewUrlParser: true }, function (err) {
  if (err) console.log(err);
})
app.listen(8080, () => console.log("server started listening on 8080"));