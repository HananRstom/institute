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
    var email;
    var testEmail;
    var Cemail = "false";
    let accept_email = ["hotmail", "gmail"];
    const monk = require("monk");
    const url = "mongodb://localhost:27017/languages";
    const db = monk(url);

    const collection = db.get("teachers");

    app.post("/teachInfo", async (req, res) => {
      check = "";
      testEmail = false;
      Fname = req.body.f_name;
      Mname = req.body.m_name;
      Lname = req.body.l_name;
      subject = req.body.subject;

      wage = req.body.wage;
      Email = req.body.Email;
      email = Email.toLowerCase();
      if (Email != "") {
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
    app.get("/link1", async function (req, res) {
      testEmail = false;
      async function dd() {
        collection.find({ email: email }, function (err, docs) {
          console.log(typeof docs);
          if (err) {
            console.log(err);

            return;
          }

          if (Object.keys(docs).length !== 0) {
            console.log("The object is not empty");
            testEmail = true;
          } else {
            console.log("The object is empty");
          }
          console.log("hello");

          console.log(docs);
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
      }
      await dd();
    });
  },
};
