module.exports = {
    addTeacher: function (app, dic) {
        app.get("/addTeacher", function (req, res) {
            res.sendFile(dic + "/html/addTeacher.html");
        });
        var MongoClient = require("mongodb").MongoClient;
        var url = "mongodb://0.0.0.0:27017/languages";
        var Fname;
        var Mname;
        var Lname;
        var subject;
        var wage;
        var obj1;

        app.post("/teachInfo", (req, res) => {
            Fname = req.body.f - name;
            Mname = req.body.m - name;
            Lname = req.body.l - name;
            subject = req.body.subject;
            wage = req.body.wage;

            obj1 = {
                Fname: Fname,
                Mname: Mname,
                Lname: Lname,
                subject: subject,
                wage: wage
            };

            MongoClient.connect(url, async function (err, db) {
                if (err) throw err;
                var dbo = db.db("languages");

                await dbo.collection("teachers").insertOne(obj1, function (err, res) {
                    if (err) throw err;
                    console.log("add new teacher ");
                });
            });
        });
    }
};