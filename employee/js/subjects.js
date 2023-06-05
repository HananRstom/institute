module.exports = {
    subjects: function (app, dic) {
        app.get("/subjects", function (req, res) {
            res.sendFile(dic + "/html/subjects.html");
        });
    }
}