const { result, isEmpty } = require("lodash");
const { emit } = require("nodemon");
const { parseArgs } = require("util");

module.exports = {
  deleteSubject: async function (app, dic) {
    const monk = require("monk");
    const url = "mongodb://0.0.0.0:27017/languages";
    const db = monk(url);
    const collSubject = db.get("subjects");
    const collteacher = db.get("teachers");
    const collclass = db.get("class");
    const collStudent = db.get("students");
    let course;
    let obj;
    let data1;
    let Error = false;
    app.get("/deleteSubject", async function (req, res) {
      res.sendFile(dic + "/html/delete_subject.html");
      async function nn() {
        return new Promise((resolve, reject) => {
          collSubject.find({}, function (err, docs) {
            if (err) {
              console.log(err);
              reject(err);
            }
            Info = docs;
            resolve({ Info });
          });
        });
      }
      const result = await nn();
      data = result.Info;

      app.get("/data1", (req, res) => {
        res.json(data);
      });
    });
    async function getData(subject) {
      return new Promise((resolve, reject) => {
        collSubject.findOne({ courseNumb: subject }, function (err, docs) {
          if (err) {
            console.log(err);
            reject(err);
          }
          Info = docs;
          resolve({ Info });
        });
      });
    }
    async function getStudent(subject) {
      return new Promise((resolve, reject) => {
        collStudent.findOne({
          courseNumb: subject,
          $expr: { $lt: ["$paid_amount", "$price"] }
        }, function (err, docs) {
          if (err) {
            console.log(err);
            reject(err);
          }
          Info = docs;
          resolve({ Info });
        });
      });
    }
    app.post("/delete1", async function (req, res) {
      Error = false;
      course = parseInt(req.body.course);
      let data = await getData(course)
      data1 = data.Info;
      let student = await getStudent(course)
      console.log(student.Info)
      if (!isEmpty(student.Info))
        Error = true;
      res.send();
    });
    app.post("/delConfirm", function (req, res) {
      let classNumber = data1.Class;
      let days = data1.Days;
      let hour = data1.Hour;
      let email = data1.Teacher;
      let targetValue = [];
      let targetTeacher = [];
      let rowIndex = -1;
      let rowIndex1 = -1;
      targetValue[0] = days;
      targetValue[1] = hour;
      targetTeacher[0] = days;
      targetTeacher[1] = hour;
      targetTeacher[2] = classNumber;
      if (course != "") {
        collSubject.remove({ courseNumb: course });
        collStudent.remove({ courseNumb: course })
        collclass
          .findOne({ number: parseInt(classNumber) })
          .then((document) => {
            if (document && document.busy && Array.isArray(document.busy)) {
              const busyArray = document.busy;

              // الحصول على مؤشر السطر
              for (let row = 0; row < busyArray.length; row++) {
                const rowArray = busyArray[row];
                const targetRow = JSON.stringify(targetValue);

                if (JSON.stringify(rowArray) === targetRow) {
                  rowIndex = row;
                  break;
                }
              }

              console.log("Row Index:", rowIndex);

              // حذف السطر بأكمله من المصفوفة
              if (rowIndex >= 0) {
                busyArray.splice(rowIndex, 1);

                // حفظ التغييرات في قاعدة البيانات
                return collclass.update(
                  { number: parseInt(classNumber) },
                  { $set: { busy: busyArray } }
                );
              } else {
                console.log("The row is invalid");
              }
            } else {
              console.log("Document not found or invalid busy array");
            }
          })
          .then(() => {
            console.log("Deleted row from class successfully");
          })
          .catch((error) => {
            console.error("Error while deleting row:", error);
          });

        ///////////////////////////
        collteacher
          .findOne({ email: email })
          .then((document) => {
            if (document && document.work && Array.isArray(document.work)) {
              const workArray = document.work;

              for (let row = 0; row < workArray.length; row++) {
                const rowArray = workArray[row];
                const targetRow = JSON.stringify(targetTeacher);

                if (JSON.stringify(rowArray) === targetRow) {
                  rowIndex1 = row;
                  break;
                }
              }

              console.log("Row Index:", rowIndex1);

              if (rowIndex1 >= 0) {
                workArray.splice(rowIndex1, 1);
                return collteacher.update(
                  { email: email },
                  { $set: { work: workArray } }
                );
              } else {
                console.log("The row is invalid");
              }
            } else {
              console.log("Document not found or invalid busy array");
            }
          })
          .then(() => {
            console.log("Deleted row fom teacher successfully");
          })
          .catch((error) => {
            console.error("Error while deleting row:", error);
          });
      }
      res.send();
    });
    app.get("/delsub", function (req, res) {
      obj = {
        Error: Error,
        course: course,
        Data: data1,
      };
      res.json(obj);
    });
  },
};
