module.exports = {
  editSubject: async function (app, dic) {
    const monk = require("monk");
    const url = "mongodb://0.0.0.0:27017/languages";
    const db = monk(url);
    const collSubject = db.get("subjects");
    const collteacher = db.get("teachers");
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

    const teachers = [{ value: "", text: "" }];
    let Stime;
    let ETime;
    app.post("/edit_Subject", async (req, res) => {
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
      res.send();
    });


    app.post("/confirmS", (req, res) => {
      if (price != "") {
        collSubject.update({ courseNumb: course }, { $set: { Price: price } });
      }
      if (editClass != "") {
        collSubject.update(
          { courseNumb: course },
          { $set: { Class: editClass } }
        );
      }
      if (days != "") {
        collSubject.update({ courseNumb: course }, { $set: { Days: days } });
      }
   
      if (hour != "") {
        collSubject.update({ courseNumb: course }, { $set: { Hour: hour } });
      }

      if (sday != " ") {
        collSubject.update(
          { courseNumb: course },
          { $set: { StartDay: Stime } }
        );
      }
      if (eday != " ") {
        collSubject.update({ courseNumb: course }, { $set: { EndDay: ETime } });
      }

      res.send("");
    });
    app.get("/editAll",function(req,res){
        obj={
            Course:course,
            chooseEnd:chooseEnd,
            chooseStart:chooseStart,
        }
        res.json(obj)
    })
  },
};
