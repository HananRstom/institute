const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const_ = require("lodash");
const bodyparser = require("body-parser");
const { result } = require("lodash");
const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));
const database = require("./database.js");
const creat = require("./js/creat");
const teacher = require("./js/teacher.js");
const student  = require("./js/students.js");
const subjects = require("./js/subjects.js");
creat.creat(app, __dirname);
student.student(app, __dirname);
teacher.teacher(app,__dirname);
subjects.subjects(app, __dirname);
database.database(app,__dirname);
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/home.html");
});
var selected_subject = "";
app.post("/employee", function (req, res) {
  selected_subject = "";
  if (req.body.subject) selected_subject = req.body.subject;

  res.send();
});

app.listen(8083, function (req, res) {
  console.log("server started on port 8083");
});
