module.exports = {
    teacher: function (app, dic) {
      app.get("/teacher", function (req, res) {
        res.sendFile(dic + "/html/teacher.html");
      });}}