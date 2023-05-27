module.exports = {
  creat: function (app, dic) {
    app.get("/creat", function (req, res) {
      res.sendFile(dic + "/html/creat.html");
    });
    var course;
    app.post("/course", function (req, res) {
      course = req.body.course;
      console.log(course);
      res.sendFile(dic + "/html/forms.html");
    });
    app.get("/link11", function (req, res) {
      let res1 = {
        course: course,
      };
      console.log("hioiii");
      res.json(res1);
    });
  },
};
