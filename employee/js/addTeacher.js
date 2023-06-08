module.exports = {
  addTeacher: function (app, dic) {
    app.get("/addTeacher", function (req, res) {
      res.sendFile(dic + "/html/addTeacher.html");
    });
    var MongoClient = require("mongodb").MongoClient;
    var url = "mongodb://localhost:27017/languages";
    var Fname;
    var Mname;
    var Lname;
    var subject;
    var wage;
    var Email;
    var obj1;
    var Cemail = "false";
    let accept_email = ["hotmail", "gmail"];

    app.post("/teachInfo", (req, res) => {
      Fname = req.body.f_name;
      Mname = req.body.m_name;
      Lname = req.body.l_name;
      subject = req.body.subject;
      wage = req.body.wage;
      Email = req.body, Email;

      obj1 = { Fname: Fname, Mname: Mname, Lname: Lname, subject: subject, wage: wage };
      res.send();
    });
    app.post("/confirm", function (req, res) {

      let emaill = email.toLowerCase();
      if (email != "") {
        for (let i = 0; i < accept_email.length; i++)
          if (emaill.search("@" + accept_email[i] + ".com") != -1) {
            Cemail = true;
            break;
          }
      }
      if (Cemail == false && email != "") {
        test1 = "Not accept email";
      }
      MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db("languages");

        await dbo.collection("teachers").insertOne(obj1, function (err, res) {
          if (err) throw err;
          console.log("add new teacher ");
        });
      });
      res.send("your request has been confirmed");
    });
    app.get("/link1", function (req, res) {
      let object = {
        Fname: Fname,
        Mname: Mname,
        Lname: Lname,
        Email: Email,
        subject: subject,
        wage: wage,
      };
      res.json(object);
    });
  },
};
