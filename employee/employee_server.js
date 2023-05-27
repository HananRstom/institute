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

const creat = require("./js/creat");
creat.creat(app, __dirname);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/home.html");
});
var selected_subject = "";
app.post("/employee", function (req, res) {
    selected_subject = "";
    if (req.body.subject) selected_subject = req.body.subject;

    res.send();
});
app.get("/creat", function (req, res) {
    res.sendFile(__dirname + "/HTML/creat.html");
});
app.listen(8083, function (req, res) {
    console.log("server started on port 8083");
});
app.get("/link", function (req, res) {
    var res2 = {
        selected_subject: selected_subject,
    };
    signUp.register("", selected_subject);
    res.json(res2);
});


