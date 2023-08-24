const { result } = require("lodash");

module.exports = {
  creat: async function (app, dic) {
    const monk = require("monk");
    const url = "mongodb://localhost:27017/languages";
    const db = monk(url);
    const collection = db.get("students");
    const collteacher = db.get("teachers");
    const collclass = db.get("class");
    var subjCnt = [];
    var selected_subject = ["German", "Frensh", "Russian", "Kids"];
    var selected_level = [
      "Beginner",
      "Intermediate",
      "Advanced",
      "ibt1",
      "ibt2",
      "pbt1",
      "pbt2",
    ];
    var cnt;
    app.get("/creat", function (req, res) {
      res.sendFile(dic + "/html/create.html");
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
    }
    app.get("/options", (req, res) => {
      res.json(options);
    });

    //
    var number_student;
    var subject;
    var obj1;

    app.post("/course", async function (req, res) {
      var testsub = false;
      subject = req.body.course;
      for (let i = 0; i < selected_level.length; i++) {
        if (subject != selected_level[i]) {
          testsub = true;
        }
      }
      console.log(testsub);
      if (testsub) {
        obj1 = { selected_subject: subject };
      } else {
        obj1 = { selected_subject: "English", selected_level: subject };
      }
      async function dd() {
        return new Promise((resolve, reject) => {
          collection.count(obj1, function (err, docs) {
            if (err) {
              console.log(err);
              reject(err);
            }
            Info = docs;
            resolve({ Info });
          });
        });
      }
      const result1 = await dd();
      number_student = result1.Info;
      //choose teacher
      async function findTeacher() {
        return new Promise((resolve, reject) => {
          collteacher.find(
            { subject: { $in: [subject] } },
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
      console.log(result.Info);
      const teachers = [];
      for (let i = 0; i < result.Info.length; i++) {
        teachers.push({
          value: result.Info[i].email,
          text: result.Info[i].email,
        });
      }

      obj3 = {
        teachers: teachers,
        number_student: number_student,
      };

      app.get("/teachers", (req, res) => {
        res.json(obj3);
      });

      res.sendFile(dic + "/html/create1.html");
    });
    /////work-teacher
    var email;
    app.post("/Teacher_course", async (req, res) => {
      email = req.body.teacher;

      res.send();
    });
    app.get("/create_data", async function (req, res) {
      async function findwork() {
        return new Promise((resolve, reject) => {
          collteacher.find({ email: email }, function (err, docs) {
            if (err) {
              console.log(err);
              reject(err);
            }
            Info = docs;
            resolve({ Info });
          });
        });
      }
      const workTeacher = await findwork();
      var resultTeachers = workTeacher.Info;
      async function bussy1() {
        return new Promise((resolve, reject) => {
          collclass.find({ number: 1 }, function (err, docs) {
            if (err) {
              console.log(err);
              reject(err);
            }
            Info = docs;
            resolve({ Info });
          });
        });
      }
      const classes1 = await bussy1();
      var class1 = classes1.Info;

      async function bussy2() {
        return new Promise((resolve, reject) => {
          collclass.find({ number: 2 }, function (err, docs) {
            if (err) {
              console.log(err);
              reject(err);
            }
            Info = docs;
            resolve({ Info });
          });
        });
      }
      const classes2 = await bussy2();
      var class2 = classes2.Info;
      async function bussy3() {
        return new Promise((resolve, reject) => {
          collclass.find({ number: 3 }, function (err, docs) {
            if (err) {
              console.log(err);
              reject(err);
            }
            Info = docs;
            resolve({ Info });
          });
        });
      }
      const classes3 = await bussy3();
      var class3 = classes3.Info;
      console.log(class1 + class2 + "iiiii");

      var obj4 = {
        resultTeachers: resultTeachers,
        class1: class1,
        class2: class2,
        class3: class3,
      };
      res.json(obj4);
    });
  },
};
