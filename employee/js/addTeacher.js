const { isEmpty } = require("lodash");

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
    const url = "mongodb://0.0.0.0:27017/languages";
    const db = monk(url);
    const work = [[" ", " ", " "]];
    const collection = db.get("teachers");
    const cnt = db.get("counters")

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
      
      cnt.update({ I: 3 }, { $inc: { count: 1 } });
      if (Email != "") {
        let isValidEmail = false;
        for (let i = 0; i < accept_email.length; i++) {
          if (email.includes("@" + accept_email[i] + ".com")) {
            isValidEmail = true;
            break;
          }
        }
        
        if (!isValidEmail) {
          check = "Please check the email address entered and try again";
        }
      }
     
      obj1 = {
        Fname: Fname,
        Mname: Mname,
        Lname: Lname,
        subject: subject,
        wage: wage,
        email: Email,
        work: work,
      };

      res.send();
    });

    app.post("/confirm", async function (req, res) {
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
      async function ID() {
        return new Promise((resolve, reject) => {
          cnt.find({ I: 3 }, function (err, docs) {
            if (err) {
              console.log(err);
              reject(err);
            }
            Info = docs;
            resolve({ Info });
          });
        });
      }

      const I = await ID();
      var id = I.Info;

      collection.update(obj1, { $set: { ID: id[0].count } })

      res.send("Your request has been confirmed");
    });
    app.get("/link1", async function (req, res) {
      testEmail = false;

      async function findTeacher() {
        return new Promise((resolve, reject) => {
          collection.find({ email: email }, function (err, docs) {
            if (err) {
              console.log(err);
              reject(err);
            }
            Info = docs;
            resolve({ Info });
          });
        });
      }

      const result2 = await findTeacher();
      var result4 = result2.Info;
      if (!isEmpty(result4)) {
        testEmail = true;
      }
;
      async function ID() {
        return new Promise((resolve, reject) => {
          cnt.find({ I: 3 }, function (err, docs) {
            if (err) {
              console.log(err);
              reject(err);
            }
            Info = docs;
            resolve({ Info });
          });
        });
      }

      const I = await ID();
      var id = I.Info;
         let object = {
        Fname: Fname,
        Mname: Mname,
        Lname: Lname,
        Email: Email,
        subject: subject,
        wage: wage,
        check: check,
        testEmail: testEmail,
        id: id
      };
      res.json(object);
    });
  },
};
