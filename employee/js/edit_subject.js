const { isEmpty } = require("lodash");

module.exports = {
  editSubject: async function (app, dic) {
    const monk = require("monk");
    const url = "mongodb://0.0.0.0:27017/languages";
    const db = monk(url);
    const collSubject = db.get("subjects");
    const collteacher = db.get("teachers");
    const collclass = db.get("class");
    let data;
    let course;
    let sday, smonth, syear;
    let eday, emonth, eyear;
    let hour;
    let days;
    let price;
    let editClass;
    let obj;
    let chooseStart = false;
    let chooseEnd = false;
    app.get("/editSubject", async function (req, res) {
      res.sendFile(dic + "/html/edit_subject.html");
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

      app.get("/data", (req, res) => {
        res.json(data);
      });
    });

    let Stime;
    let ETime;
    app.post("/edit_Subject", async (req, res) => {
      course, price, editClass, sday, smonth, eday, syear, emonth, eyear, days, hour = '';
      course = parseInt(req.body.course);
      chooseStart = false;
      chooseEnd = false;
      price = req.body.price;
      editClass = req.body.class;
      sday = req.body.Sday;
      smonth = req.body.Smonth;
      syear = req.body.Syear;
      eday = req.body.Eday;
      emonth = req.body.Emonth;
      eyear = req.body.Eyear;
      days = req.body.days;
      hour = req.body.hour;
      Stime = syear + "-" + smonth + "-" + sday;
      ETime = eday + "-" + emonth + "-" + eday;
      if (
        (sday == "" && smonth == "" && syear == "") ||
        (sday != "" && smonth != "" && syear != "")
      )
        chooseStart = true;
      if (
        (eday == "" && emonth == "" && eyear == "") ||
        (eday != "" && emonth != "" && eyear != "")
      )
        chooseEnd = true;
      console.log(days)
      res.send();
    });

    app.post("/confirmS", async (req, res) => {
      let targetValue = [];
      async function nn() {
        return new Promise((resolve, reject) => {
          collSubject.find({ courseNumb: course }, function (err, docs) {
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

      let Class = parseInt(result.Info[0].Class);
      let Email = result.Info[0].Teacher;
      targetValue[0] = result.Info[0].Days;
      targetValue[1] = result.Info[0].Hour;

      if (price != "") {
        collSubject.update({ courseNumb: course }, { $set: { Price: price } });
      }
      if (editClass != "") {
        collSubject.update(
          { courseNumb: course },
          { $set: { Class: editClass } }
        );
        let rowIndex = -1;
        let columnIndex = -1;

        // استرجاع المصفوفة من قاعدة البيانات
        collclass.findOne({ number: Class })
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
                return collclass.update({ number: Class }, { $set: { busy: busyArray } });
              } else {
                console.log('The row is invalid');
              }
            } else {
              console.log('Document not found or invalid busy array');
            }
          })
          .then(() => {
            console.log('Deleted row successfully');
          })
          .catch((error) => {
            console.error('Error while deleting row:', error);
          });
        collclass.update(
          { number: parseInt(editClass) },
          { $push: { busy: targetValue } },
          function (err, result) {
            if (err) {
              console.error("ُerror class", err);
            } else {
              console.log("updete class data", result);
            }
          }
        );
      }
      if (days) {
        collSubject.update({ courseNumb: course }, { $set: { Days: days } });
      }

      if (hour != "") {
        collSubject.update({ courseNumb: course }, { $set: { Hour: hour } });
      }

      if (sday != "") {
        collSubject.update(
          { courseNumb: course },
          { $set: { StartDay: Stime } }
        );
      }
      if (eday != "") {
        collSubject.update({ courseNumb: course }, { $set: { EndDay: ETime } });
      }

      res.send("");
    });
    app.get("/editAll", function (req, res) {
      obj = {
        Course: course,
        chooseEnd: chooseEnd,
        chooseStart: chooseStart,
      }
      res.json(obj)
    })
  },
};
