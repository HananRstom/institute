module.exports = {
  creat: function (app, dic) {
    const monk = require("monk");
    const url = "mongodb://localhost:27017/languages";
    const db = monk(url);
    const collection = db.get("students");
    var cnt;

    app.get("/creat", function (req, res) {
      res.sendFile(dic + "/html/creat.html");
      cnt = collection.count({ selected_subject: "German" }).then((count) => {
        console.log(`Number of documents with selected_subject "German": ${count}`);
      }).catch((err) => {
        console.error(err);
      });
    });
    var number_student;
    var price;
    var times;
    var days;
    var number_of_hours;
    var teacher;
    var test;
    var obj1;

    app.post("/course", function (req, res) {
      number_student = req.body.number_student;
      price = req.body.price;
      times = req.body.times;
      days = req.body.days;
      number_of_hours = req.body.number_of_hours;
      teacher = req.body.teacher;
      test = req.body.test;

      res.send();
    });

    app.get("link1", (req, res) => {
      obj1 = {
        number_student: number_student,
        price: price,
        times: times,
        days: days,
        number_of_hours: number_of_hours,
        teacher: teacher,
        test: test,
      };
      res.json(obj1);
    });
    var val;
    if (cnt>= 10){
      val="German"
    }
      const options = [
        { value: val, text: val },
      ];
    app.get("/options", (req, res) => {
      res.json(options);
    });
  },
};
