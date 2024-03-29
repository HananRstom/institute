const { result, isEmpty, set, toArray } = require("lodash");
var moment = require("moment");
module.exports = {
  creat: async function (app, dic) {
    const monk = require("monk");
    const url = "mongodb://0.0.0.0:27017/languages";
    const db = monk(url);
    const collection = db.get("students");
    const collteacher = db.get("teachers");
    const collclass = db.get("class");
    const collSubject = db.get("subjects");
    const count = db.get("counters");
    let subjCnt = [];
    let Year = moment().format("YYYY");
    let selected_subject = ["German", "Frensh", "Russian", "Kids"];
    let selected_level = [
      "Beginner",
      "Intermediate",
      "Advanced",
      "ibt1",
      "ibt2",
      "pbt1",
      "pbt2",
    ];
    async function getData(subject, level) {
      return new Promise((resolve, reject) => {
        collection.count(
          {
            selected_subject: subject,
            selected_level: level,
            price: { $exists: 0 },
          },
          function (err, docs) {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve({ Info: docs });
          }
        );
      });
    }

    let cnt;
    let email;
    let Class_Num;
    let days;
    let emptyHour;
    let number_student;
    let subject;
    let obj1;
    let obj2;
    let obj3;
    let obj4;
    let Time = " ";
    let EndTime = " ";
    let price;
    let subj;
    let id;
    let options = [];
    let max;
    let min;
    app.post("/min-max", async function (req, res) {
      min = 0;
      max = 40;
      subjCnt = []
      options = []
      max = parseInt(req.body.max);
      min = parseInt(req.body.min);
      // checking the number of students in each course
      for (let i = 0; i < selected_subject.length; i++) {
        const result = await getData(selected_subject[i], "");
        cnt = result.Info;
        subjCnt.push([cnt, selected_subject[i]]);
      }

      for (let i = 0; i < selected_level.length; i++) {
        const result = await getData("English", selected_level[i]);
        cnt = result.Info;
        subjCnt.push([cnt, selected_level[i]]);
      }

      // Fill out the select for courses
      for (let j = 0; j < subjCnt.length; j++) {
        if (parseInt(subjCnt[j][0]) >= min) {
          options.push({ value: subjCnt[j][1], text: subjCnt[j][1] });
        }
      }
      res.send();
    });
    app.get("/creat", async function (req, res) {
      res.sendFile(dic + "/html/create.html");
    });
    app.get("/options", (req, res) => {
      res.json(options);
    });
    app.post("/course", async function (req, res) {
      let result1;
      //choose teacher
      subject = req.body.course;
      if (
        subject == "Beginner" ||
        subject == "Intermediate" ||
        subject == "Advanced" ||
        subject == "ibt1" ||
        subject == "ibt2" ||
        subject == "pbt1" ||
        subject == "pbt2"
      )
        result1 = await getData("English", subject);
      else result1 = await getData(subject, "");
      number_student = result1.Info;
      async function findTeacher() {
        if (
          subject == "German" ||
          subject == "Frensh" ||
          subject == "Russian" ||
          subject == "Kids" ||
          subject == "Beginner" ||
          subject == "Intermediate" ||
          subject == "Advanced"
        )
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
        else {
          return new Promise((resolve, reject) => {
            collteacher.find(
              { subject: { $in: ["TOEFL"] } },
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

    app.post("/Teacher_course", async (req, res) => {
      email = req.body.teacher;
      res.send();
    });
    app.post("/Free_hour", async (req, res) => {
      Class_Num = req.body.class;

      days = req.body.days;

      res.send();
    });
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
      let AvailableHoure = [];
      //check what hours will be free
      let Hour_teacher = [];
      let BussyClass = [];
      for (let i = 8; i < 19; i++) {
        Hour_teacher[i] = 1;
        BussyClass[i] = 1;
      }
      ////Busy hours (teacher)
      async function findwork() {
        return new Promise((resolve, reject) => {
          collteacher.find(
            {
              email: email,
            },
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

      const workTeacher = await findwork();
      var resultTeachers = workTeacher.Info[0].work;
      if (!isEmpty(resultTeachers)) {
        for (let i = 0; i < resultTeachers.length; i++) {
          if (resultTeachers[i][0] == days) {

            let j = parseInt(resultTeachers[i][1])
            Hour_teacher[j] = 0;
          }
        }
      }
      console.log(Hour_teacher)
      ////Busy hours (class)

      async function bussyHours() {
        return new Promise((resolve, reject) => {
          collclass.find(
            {
              number: parseInt(Class_Num),
            },
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

      const classes = await bussyHours();
      var v = classes.Info[0].busy;

      if (!isEmpty(v)) {
        for (let i = 0; i < v.length; i++) {
          if (v[i][0] == days) {

            let j = parseInt(v[i][1])
            BussyClass[j] = 0;
          }
        }
      }
      for (let i = 8; i <= 18; i++) {
        if (BussyClass[i] && Hour_teacher[i]) {
          AvailableHoure.push(i)
        }

      }

      obj2 = {
        AvailableHoure: AvailableHoure,
      };
      res.json(obj2);
    });

    app.post("/hour", async (req, res) => {
      emptyHour = req.body.hours;
      var Sday = req.body.Sday;
      var SMonth = req.body.Smonth;
      price = req.body.Price;
      Time = Year + "-" + SMonth + "-" + Sday;
      if (parseInt(SMonth) != 12 && parseInt(SMonth) !== 11)
        EndTime = Year + "-" + (parseInt(SMonth) + 2) + "-" + Sday;
      else if (parseInt(SMonth) == 11)
        EndTime = parseInt(Year) + 1 + "-" + "1" + "-" + Sday;
      else if (parseInt(SMonth) == 12)
        EndTime = parseInt(Year) + 1 + "-2-" + Sday;
      //for Course ID
       count.update({ I: 4 }, { $inc: { count: 1 } });
      //create ID for each course
      async function ID() {
        return new Promise((resolve, reject) => {
          count.find({ I: 4 }, function (err, docs) {
            if (err) {
              console.log(err);
              reject(err);
            }
            Info = docs;
            resolve({ Info });
          });
        });
      }

      const I = await ID();
      id = I.Info[0].count;
      let num;
      if (max > number_student)
        num = number_student;
      else
        num = max;

      subj = {
        SubjectName: subject,
        Teacher: email,
        StartDay: Time,
        EndDay: EndTime,
        Hour: emptyHour,
        Days: days,
        Class: Class_Num,
        Price: price,
        courseNumb: id,
        Number_student: num,
      };

      res.send();
    });
    app.get("/AllData", (req, res) => {
      obj4 = {
        subject: subject,
        email: email,
        Class_Num: Class_Num,
        days: days,
        emptyHour: emptyHour,
        subj: subj,
        id: id,
      };

      res.json(obj4);
    });

    app.post("/confCreate", async (req, res) => {

      var newSubarray = [days, emptyHour, Class_Num];

      var ClassQuery = { number: parseInt(Class_Num) };

      collSubject.insert(subj);
      var subClass = [days, emptyHour];
      var myquery = { email: email };
      collteacher.update(
        myquery,
        { $push: { work: newSubarray } },
        function (err, result) {
          if (err) {
            console.error("ُerror", err);
          } else {
            console.log("updete data", result);
          }
        }
      );
      await collclass.update(
        ClassQuery,
        { $push: { busy: subClass } },
        function (err, result) {
          if (err) {
            console.error("ُerror class", err);
          } else {
            console.log("updete class data", result);
          }
        }
      );

      if (
        subject == "German" ||
        subject == "Frensh" ||
        subject == "Russian" ||
        subject == "Kids"
      ) {
        for (let i = 0; i < max; i++) {
          await collection.update(
            { selected_subject: subject, price: { $exists: 0 } },
            {
              $set: {
                price: parseInt(price),
                Paid_amount: 0,
                Last_payment: 0,
                StartDay: Time,
                EndDay: EndTime,
                courseNumb: id,
              },
            },
            function (err, result) {
              if (err) {
                console.error("ُerror student", err);
              } else {
                console.log("updete student data", result);
              }
            }
          );
        }
      } else {
        for (let i = 0; i < max; i++) {
          await collection.update(
            { selected_level: subject, price: { $exists: 0 } },
            {
              $set: {
                price: parseInt(price),
                Paid_amount: 0,
                Last_payment: 0,
                StartDay: Time,
                EndDay: EndTime,
                courseNumb: id,
              },
            },
            function (err, result) {
              if (err) {
                console.error("ُerror student", err);
              } else {
                console.log("updete student data", result);
              }
            }
          );
        }
      }

      res.send("Upadte data successfuly");
    });
  },
};
