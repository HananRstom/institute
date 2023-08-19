module.exports = {
  creat: function (app, dic) {
    const monk = require("monk");
    const url = "mongodb://localhost:27017/languages";
    const db = monk(url);
    const collection = db.get("students");
    const collteacher = db.get("teacher")
    var subjCnt = [];
    var teacherName = [];
    var selected_subject = ["German", "Frensh", "Russian", "Kids"]
    var selected_level = ["Beginner", "Intermediate", "Advanced", "ibt1", "ibt2", "pbt1", "pbt2"]
    var cnt;
    app.get("/creat", function (req, res) {
      res.sendFile(dic + "/html/create.html");
      for (let i = 0; i < selected_subject.length; i++) {
        cnt = collection.count({ selected_subject: selected_subject[i] }).then((count) => {
          console.log(`Number of documents with selected_subject : ${count}`);
        }).catch((err) => {
          console.error(err);
        });
        subjCnt.push([cnt, selected_subject[i]])
      }
      for (let i = 0; i < selected_level.length; i++) {
        cnt = collection.count({ selected_subject: "English", selected_level: selected_level[i] }).then((count) => {
          console.log(`Number of documents with selected_subject : ${count}`);
        }).catch((err) => {
          console.error(err);
        });
        subjCnt.push([cnt, selected_level[i]])
      }
    });
    var number_student;
    var price;
    var times;
    var days;
    var number_of_hours;
    var teacher;
    var test;
    var obj1;
    var subject;
    var rowIndex;
    subjCnt = [[11, "German"]];
    app.post("/course", function (req, res) {
      subject = req.body.course;
      subjCnt.forEach(function(row, rowIndex) {
        row.forEach(function(element, columnIndex) {
          if (element === subject) {
            console.log("Element found at row " + rowIndex + " and column " + columnIndex);
            found = true;
          }
        });
      });
      collteacher.find(
        { subject: subject },
        function (err, docs) {
          console.log(typeof docs);
          if (err) {
            console.log(err);

            return;
          }
          teacherName = data.toArray();
          console.log(teacherName);
          doc = docs;
          const teachers = [];
          for (let i = 0; i < teacherName.length; i++) {

            teachers.push({ value: teacherName[i].email, text: teacherName[i].email })

          }
          app.get("/teachers", (req, res) => {
            res.json(teachers);
          });
        }
      );
      res.sendFile(dic + "/HTML/create1.html");
      
    });
    app.get("link1", (req, res) => {
      obj1 = {
        number_student: subjCnt[rowIndex][0],
        price: price,
        times: times,
        days: days,
        number_of_hours: number_of_hours,
        teacher: teacher,
        test: test,
      };
      res.json(obj1);
    });
    const options = [];
    for (let i = 0; i < subjCnt.length; i++) {

      if (subjCnt[i][0] >= 10) {
        options.push({ value: subjCnt[i][1], text: subjCnt[i][1] })
      }
    }
    app.get("/options", (req, res) => {
      res.json(options);
    });
  },
};