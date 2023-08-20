module.exports = {
  creat: async function (app, dic) {
    const monk = require("monk");
    const url = "mongodb://localhost:27017/languages";
    const db = monk(url);
    const collection = db.get("students");
    const collteacher = db.get("teacher");
    var subjCnt = [];
    var teacherName = [];
    var selected_subject = ["German", "Frensh", "Russian", "Kids"];
    var selected_level = ["Beginner", "Intermediate", "Advanced", "ibt1", "ibt2", "pbt1", "pbt2",];
    var cnt;
    app.get("/creat", function (req, res) {
      res.sendFile(dic + "/html/create.html");

    });
    //
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

    app.post("/course", async function (req, res) {
      subject = req.body.course;
      //choose teacher
      async function findTeacher() {
        return new Promise((resolve, reject) => {
          collteacher.find(
            { subject: subject },
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
      const result = await findTeacher();

      const teachers = [];
      for (let i = 0; i < result.Info.length; i++) {
        teachers.push({
          value: result.Info[i].email,
          text: result.Info[i].email,
        });
      }

      app.get("/teachers", (req, res) => {
        res.json(teachers);
      });

      res.sendFile(dic + "/HTML/create1.html");
    });
    //مانو مهم
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
    //checking the number of students in each course
    const options = [];
    for (let i = 0; i < selected_subject.length; i++) {
      async function dd() {
        return new Promise((resolve, reject) => {
          collection.count(
            { selected_subject: selected_subject[i] },
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
      const result = await dd();
      cnt = result.Info;
      subjCnt.push([cnt, selected_subject[i]]);
    }
    /////////////////
    for (let i = 0; i < selected_level.length; i++) {
      async function nn() {
        return new Promise((resolve, reject) => {
          collection.count(
            { selected_subject: "English", selected_level: selected_level[i] },
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
      const result = await nn();

      cnt = result.Info;

      subjCnt.push([cnt, selected_level[i]]);
    }

    //fill out the selecte for coures
    for (let j = 0; j < subjCnt.length; j++) {
      if (parseInt(subjCnt[j][0]) >= 1) {
        options.push({ value: subjCnt[j][1], text: subjCnt[j][1] });
      }
      console.log(subjCnt[j][1]);
    }
    app.get("/options", (req, res) => {
      res.json(options);
    });
  },

};
