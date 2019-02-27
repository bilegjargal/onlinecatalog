const express = require('express');
const parser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const config = require("./.dotenv");

let db = null;
app = express();
mongo.connect(config.config.dbConnection, function (err, client) {
  if (err) {
    console.log(err);
    return;
  }
  db = client.db("ecatalog");
});

app.listen(8080, () => console.log("server started listening on 8080"));