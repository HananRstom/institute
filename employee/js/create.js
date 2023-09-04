const { result } = require("lodash");

module.exports = {
  creat: async function (app, dic) {
    const monk = require("monk");
    const url = "mongodb://0.0.0.0:27017/languages";
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
      //choose teacher
      subject = req.body.course;
      for (let i = 0; i < selected_level.length; i++) {
        if (subject != selected_level[i]) {
          testsub = true;
        }
      }

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

      const teachers = [];
      for (let i = 0; i < result.Info.length; i++) {
        teachers.push({
          value: result.Info[i].email,
          text: result.Info[i].email,
        });
      }
      ///fill out the select for teacher and send the number of student
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
    var Class_Num;
    var days;
    var AvailableHoure = [];
    app.post("/Teacher_course", async (req, res) => {
      email = req.body.teacher;
      res.send();
    });
    app.post("/Free_hour", async (req, res) => {
      Class_Num = req.body.class;
      console.log(Class_Num + "hi")
      days = req.body.days;

      res.send()
    })
    app.get("/create_data", async function (req, res) {
      ///send the info about teacher and classes
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
      var obj4 = {
        resultTeachers: resultTeachers,
        class1: class1,
        class2: class2,
        class3: class3,
      };
      res.json(obj4);
    });
    app.get("/Time_data", async (req, res) => {
      //check what hours will be free

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
      ////Busy hours (class)
      console.log("class num " + Class_Num)

      async function bussyHours() {
        return new Promise((resolve, reject) => {
          collclass.find({ number: Class_Num, busy: { $in: [days] } }, function (err, docs) {
            if (err) {
              console.log(err);
              reject(err);
            }
            Info = docs;
            resolve({ Info });
          });
        });
      }
      const classes = await bussyHours();
      var v = classes.Info;
      console.log(v + "vv")
      var BussyClass = v.busy
      console.log(BussyClass + "bbbbb")

      ////Busy hours (teacher)
      // var Hour_teacher = resultTeachers.work[0][0]

      // .forEach(row => {
      //   const thirdColumnElement = row[1];
      // })
      // for (let i = 8; i <= 18; i++) {
      //   if (Hour_teacher[i] != i && BussyClass[i] != i)
      //     AvailableHoure.push(i)

      // }
      var obj2;
      obj2 = {
        AvailableHoure: AvailableHoure
      }
      res.json(obj2)

    })



  },
};
