module.exports = {
  addTeacher: function (app, dic) {
    app.get("/addTeacher", function (req, res) {
      res.sendFile(dic + "/html/addTeacher.html");
    });

    var Fname;
    var Mname;
    var Lname;
    var subject;
    var wage;
    var Email = "";
    var obj1;
    var Cemail = false;
    var check;
    var testEmail = false;
    let accept_email = ["hotmail", "gmail"];
    const monk = require("monk");
    const url = "mongodb://localhost:27017/languages";
    const db = monk(url);

    const collection = db.get("teachers");

    app.post("/teachInfo", (req, res) => {
      check = "";
      Fname = req.body.f_name;
      Mname = req.body.m_name;
      Lname = req.body.l_name;
      subject = req.body.subject;

      wage = req.body.wage;
      Email = req.body.Email;
      let email = Email.toLowerCase();
      if (email != "") {
        for (let i = 0; i < accept_email.length; i++)
          if (email.search("@" + accept_email[i] + ".com") != -1) {
            Cemail = true;
            break;
          }
      }
      if (Cemail == false) {
        check = "Please check the email address entered and try again";
      }
      console.log(email);
      console.log(Cemail);
      obj1 = {
        Fname: Fname,
        Mname: Mname,
        Lname: Lname,
        subject: subject,
        wage: wage,
        email: Email,
      };
      collection.find({ email: email }, function (err, docs) {
        if (err) {
          console.log(err);
          return;
        }
        testEmail = true;
        console.log(docs);
      });

      res.send();
    });
    app.post("/confirm", function (req, res) {
      collection
        .insert(obj1)
        .then((doc) => {
          console.log("Document inserted successfully:", doc);
        })
        .catch((err) => {
          console.error("Error while inserting document:", err);
        })
        .then(() => {
          db.close();
        });

      res.send("Your request has been confirmed");
    });
    app.get("/link1", function (req, res) {
      let object = {
        Fname: Fname,
        Mname: Mname,
        Lname: Lname,
        Email: Email,
        subject: subject,
        wage: wage,
        check: check,
        testEmail: testEmail,
      };
      res.json(object);
    });
  },
};
