module.exports = {
  forms: function (app, dic) {
    app.get("/forms", function (req, res) {
      res.sendFile(dic + "/HTML/forms.html");
    });
  },
};
