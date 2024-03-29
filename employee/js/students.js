const { isEmpty } = require("lodash");
var moment = require("moment");
module.exports = {
  student: function (app, dic) {
    app.get("/student", function (req, res) {
      res.sendFile(dic + "/html/students.html");
    });
    const monk = require("monk");
    const url = "mongodb://0.0.0.0:27017/languages";
    const db = monk(url);
    var paymentDate = moment().format("YYYY-MM-DD");
    var email;
    var id;
    var test;
    var error = false;
    var payment;
    var rest = 0;
    const collStudent = db.get("students");
    const collSubj = db.get("subjects");
    app.post("/student", function (req, res) {
      test = true;
      error = false;
      email = "";
      id = "";
      email = req.body.email;
      id = req.body.StudentID;
      if (email == "" && id == "") {
        test = false;
      }
      res.send();
    });
    app.post("/payment", function (req, res) {
      payment = req.body.payment;
      res.send();
    });
    app.post("/confStudent", async (req, res) => {
      var data;
      async function findStudent() {
        if (email != "") {
          return new Promise((resolve, reject) => {
            collStudent.find({ email: email }, function (err, docs) {
              if (err) {
                console.log(err);
                reject(err);
              }
              Info = docs;
              resolve({ Info });
            });
          });
        } else if (id != "") {
          return new Promise((resolve, reject) => {
            collStudent.find(
              { student_id: parseInt(id) },
              function (err, docs) {
                if (err) {
                  console.log(err);
                  reject(err);
                }
                Info = docs;
                resolve({ Info });
              }
            );
          });
        }
      }

      var result = await findStudent();
      data = result.Info;
      var pay = data[0].Paid_amount + parseInt(payment);
      if (email != "") {
        collStudent.update(
          { email: email },
          { $set: { Paid_amount: pay, Last_payment: payment,paymentDate:paymentDate } }
        );
      } else {
        collStudent.update(
          { student_id: parseInt(id) },
          { $set: { Paid_amount: pay, Last_payment: payment,paymentDate:paymentDate } }
        );
      }
      res.send("");
    });
    app.get("/studentData", async function (req, res) {
      var data;

      async function findStudent() {
        if (email != "") {
          return new Promise((resolve, reject) => {
            collStudent.find({ email: email }, function (err, docs) {
              if (err) {
                console.log(err);
                reject(err);
              }
              Info = docs;
              resolve({ Info });
            });
          });
        } else if (id != "") {
          return new Promise((resolve, reject) => {
            collStudent.find(
              { student_id: parseInt(id) },
              function (err, docs) {
                if (err) {
                  console.log(err);
                  reject(err);
                }
                Info = docs;
                resolve({ Info });
              }
            );
          });
        }
      }

      var result = await findStudent();
      data = result.Info;
     
 
      if (isEmpty(data)) {
        error = true;
      }
      if(data[0]?.price){
      rest = data[0].price - data[0].Paid_amount;
      }
      var check=rest-parseInt(payment);
      obj = {
        error: error,
        data: data,
        test: test,
        payment: payment,
        rest: rest,
        check:check
      };
      res.json(obj);
    });
  },
};
