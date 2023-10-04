const { result } = require("lodash");
const { emit } = require("nodemon");

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
      let classNumber = data[0].Class;
      let days = data[0].Days;
      let hour = data[0].Hour;
      let email=data[0].Teacher;
      app.get("/data1", (req, res) => {
        res.json(data);
      });
    });
    app.post("/delete1", function (req, res) {
      course = parseInt(req.body.course);
      console.log(course);

      res.send();
    });
    app.post("/delConfirm", function (req, res) {
      let targetValue = [];
      let targetTeacher = [];
      targetValue[0] = result.Info[0].Days;
      targetValue[1] = result.Info[0].Hour;
      targetTeacher[0] = result.Info[0].Days;
      targetTeacher[1] = result.Info[0].Hour;
      targetTeacher[2] = result.Info[0].courseNumb;
      if (course != "") {
        collSubject.deleteOne({ courseNumb: course });

        collclass
          .findOne({ number: classNumber })
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
                  { number: Class },
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
            console.log("Deleted row successfully");
          })
          .catch((error) => {
            console.error("Error while deleting row:", error);
          });

        ///////////////////////////
        collteacher
          .findOne({email:email })
          .then((document) => {
            if (document && document.work && Array.isArray(document.work)) {
              const workArray = document.work;

              // الحصول على مؤشر السطر
              for (let row = 0; row < workArray.length; row++) {
                const rowArray = workArray[row];
                const targetRow = JSON.stringify(targetTeacher);

                if (JSON.stringify(rowArray) === targetRow) {
                  rowIndex = row;
                  break;
                }
              }

              console.log("Row Index:", rowIndex);

              // حذف السطر بأكمله من المصفوفة
              if (rowIndex >= 0) {
                workArray.splice(rowIndex, 1);

                // حفظ التغييرات في قاعدة البيانات
                return collteacher.update(
                  { email:email },
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
            console.log("Deleted row successfully");
          })
          .catch((error) => {
            console.error("Error while deleting row:", error);
          });
      }
      res.send();
    });
    app.get("/delsub", function (req, res) {
      obj = {
        course: course,
      };
      res.json(obj);
    });
  },
};
