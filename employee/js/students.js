module.exports = {
    student: function (app, dic) {
        app.get("/student", function (req, res) {
            res.sendFile(dic + "/html/students.html");
        });
    }
}