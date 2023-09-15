const { result, isEmpty, set, toArray } = require("lodash");

module.exports = {
  creat: async function (app, dic) {
    const monk = require("monk");
    const url = "mongodb://0.0.0.0:27017/languages";
    const db = monk(url);
    const collection = db.get("students");
    const collteacher = db.get("teachers");
    const collclass = db.get("class");
    const collSubject = db.get("subjects");
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
    var email;
    var Class_Num;
    var days;
    var emptyHour;
    var number_student;
    var subject;
    var obj1;
    var obj2;
    var obj3;
    var obj4;
    var Time = " ";
    var EndTime = " ";
    var price;
    var subj;
    app.get("/creat", function (req, res) {
      res.sendFile(dic + "/html/create.html");
    });
    //checking the number of students in each course
    const options = [];
    for (let i = 0; i < selected_subject.length; i++) {
      async function dd() {
        return new Promise((resolve, reject) => {
          collection.count(
            {
              selected_subject: selected_subject[i],
              price: { $exists: 0},
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
      const result = await dd();
      cnt = result.Info;
      subjCnt.push([cnt, selected_subject[i]]);
    }
    /////////////////
    for (let i = 0; i < selected_level.length; i++) {
      async function nn() {
        return new Promise((resolve, reject) => {
          collection.count(
            {
              selected_subject: "English",
              selected_level: selected_level[i],
              price: { $exists: 0 },
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
      var AvailableHoure = [];
      //check what hours will be free

      ////Busy hours (teacher)
      async function findwork() {
        return new Promise((resolve, reject) => {
          collteacher.find(
            {
              email: email,
              work: { $elemMatch: { $elemMatch: { $eq: days } } },
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

      var Hour_teacher = [];
      const workTeacher = await findwork();
      var resultTeachers = workTeacher.Info;
      console.log(workTeacher.Info);
      if (!isEmpty(resultTeachers)) {
        var T = [];
        T = resultTeachers.map((e) => console.log(typeof e.work));
        let arr = Object.entries(T);
        console.log(arr);
        arr.forEach((e, i) => {
          Hour_teacher.push(e[i][1]);
          console.log(i);
        });
      }
      console.log(Hour_teacher);
      ////Busy hours (class)

      async function bussyHours() {
        return new Promise((resolve, reject) => {
          collclass.find(
            {
              number: parseInt(Class_Num),
              busy: { $elemMatch: { $elemMatch: { $eq: days } } },
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
      var BussyClass = [];
      const classes = await bussyHours();
      var v = classes.Info;

      if (!isEmpty(v)) {
        var b = [];
        v.forEach((e) => {
          b.push(e.busy);
        });
        b.forEach((e, i) => {
          BussyClass.push(e[i][1]);
        });
      }
      console.log(Hour_teacher[0] + "  " + BussyClass[0]);
      for (let i = 8, j = 0; j <= 11, i <= 18; j++, i++) {
        if (Hour_teacher[j] != i && BussyClass[j] != i) AvailableHoure.push(i);
      }

      obj2 = {
        AvailableHoure: AvailableHoure,
      };
      res.json(obj2);
    });

    app.post("/hour", (req, res) => {
      emptyHour = req.body.hours;
      var Sday = req.body.Sday;
      var SMonth = req.body.Smonth;
      price = req.body.Price;
      Time = Sday + "/" + SMonth;
      if (SMonth != 12 || SMonth != 11)
        EndTime = Sday + "/" + (parseInt(SMonth) + 2);
      else if (SMonth == 11) EndTime = Sday + "/" + "1";
      else if (SMonth == 12) EndTime = Sday + "/" + "2";
      subj = {
        SubjectName: subject,
        Teacher: email,
        StartDay: Time,
        EndDay: EndTime,
        Hour: emptyHour,
        Days: days,
        Class: Class_Num,
        Price: price,
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
      };

      res.json(obj4);
    });

    app.post("/confCreate", async (req, res) => {
      var myquery = { email: email };
      // استعلم عن المستندات المطابقة لـ myquery وقم بإضافة newSubarray إلى work
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

      var newSubarray = [days, emptyHour, Class_Num];

      var ClassQuery = { number: parseInt(Class_Num) };

      collSubject.insert(subj);
      var subClass = [days, emptyHour];
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
      try {
        if (
          subject == "German" ||
          subject == "Frensh" ||
          subject == "Russian" ||
          subject == "Kids"
        ) {
          await collection.update(
            { selected_subject: subject },
            {
              $set: {
                price: parseInt(price),
                Paid_amount: 0,
                Last_payment: 0,
              },
            },{ multi: true },
            function (err, result) {
              if (err) {
                console.error("ُerror student", err);
              } else {
                console.log("updete student data", result);
              }
            }
          );
          console.log("oooooooooooooooo");
        } else {
          await collection.update(
            { selected_level: subject },
            {
              $set: {
                price: parseInt(price),
                Paid_amount: 0,
                Last_payment: 0,
              },
            },{ multi: true },
            function (err, result) {
              if (err) {
                console.error("ُerror student", err);
              } else {
                console.log("updete student data", result);
              }
            }
          );
        }
      } catch (error) {
        console.error("error", error);
      }
      res.send("Upadte data successfuly");
    });
  },
};
