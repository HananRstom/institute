module.exports = {
  creat: function (app, dic) {
    app.get("/creat", function (req, res) {
      res.sendFile(dic + "/html/creat.html");
    });
  },
};
