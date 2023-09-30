module.exports = {
  subjects: function (app, dic) {
    app.get("/subjects", function (req, res) {
      res.sendFile(dic + "/html/subjects.html");
    });
    const monk = require("monk");
    const url = "mongodb://0.0.0.0:27017/languages";
    const db = monk(url);
    const collSubject = db.get("subjects");
    const collteacher = db.get("teachers");
    let course;
    let info;
    let Teacher;
    app.post("/subject", async function (req, res) {
      course = req.body.course;
      let result = await getData(course);
      info = result.Info;
      async function findTeacher() {
        return new Promise((resolve, reject) => {
          collteacher.find(
            { subject: { $in: [course] } },
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
      const result1 = await findTeacher();
      Teacher = result1.Info;

      res.send();
    });
    async function getData(subject) {
      return new Promise((resolve, reject) => {
        collSubject.find(
          {
            SubjectName: subject,
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
    app.get("/subject", function (req, res) {
      let subj = {
        info: info,
        Teacher:Teacher
      };
      res.json(subj);
    });
  },
};
