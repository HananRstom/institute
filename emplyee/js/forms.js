module.exports = {
  forms: function (app, dic) {
    app.get("/forms", function (req, res) {
      res.sendFile(dic + "/html/forms.html");
    });
    var number_student;
    var price;
    var times;
    var days;
    var number_of_hours;
    var teacher;
    var test;
    var obj1;
    app.post("/form", function (req, res) {
      number_student = req.body.number_student;
      price = req.body.price;
      times = req.body.times;
      days = req.body.days;
      number_of_hours = req.body.number_of_hours;
      teacher = req.body.teacher;
      test = req.body.test;
      obj1 = {
        number_student: number_student,
        price: price,
        times: times,
        days: days,
        number_of_hours: number_of_hours,
        teacher: teacher,
        test: test,
      };
      res.send();
    });
  },
};
