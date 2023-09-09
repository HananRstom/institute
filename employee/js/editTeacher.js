const { isEmpty } = require("lodash");
module.exports = {
  editTeacher: function (app, dic) {
    app.get("/editTeacher", function (req, res) {
      res.sendFile(dic + "/html/editTeacher.html");
    });
    const monk = require("monk");
    const url = "mongodb://0.0.0.0:27017/languages";
    const db = monk(url);
    const collection = db.get("teachers");
    var emp = false
    var Fname1;
    var Mname1;
    var Lname1;
    var subject1;
    var wage1;
    var Email1 = "";
    var id;
    var obj1;
    var Wrong = false;

    app.post("/teacher-inf", (req, res) => {
      id = ''
      id = req.body.ID

      res.send();
    });
    app.post("/teachEdit", (req, res) => {
     subject1="", Fname1="", Lname1="", wage1="", Email1 = ""
      Fname1 = req.body.f_name;
      Mname1 = req.body.m_name;
      Lname1 = req.body.l_name;
      if (req.body.subject) {
        subject1 = req.body.subject;
      }

      wage1 = req.body.wage;
      Email1 = req.body.Email;
      obj1 = {
        Fname1: Fname1,
        Mname1: Mname1,
        Lname1: Lname1,
        subject1: subject1,
        wage1: wage1,
        Email1: Email1
      }

      console.log(subject1)
      res.send();
    });
    app.post("/confirmE", (req, res) => {
      if (Fname1 != "") {
        collection.update({ ID: parseInt(id) }, { $set: { Fname: Fname1 } })
      }
      if (Lname1 != "") {
        collection.update({ ID: parseInt(id) }, { $set: { Lname: Lname1 } })
      }
      if (Mname1 != "") {
        collection.update({ ID: parseInt(id) }, { $set: { Mname: Mname1 } })
      }
      if (Email1 != "") {
        collection.update({ ID: parseInt(id) }, { $set: { email: Email1 } })
      }
      if (wage1 != "") {
        collection.update({ ID: parseInt(id) }, { $set: { wage: wage1 } })
      }
      if (subject1 != "") {
        collection.update({ ID: parseInt(id) }, { $set: { subject: subject1 } })
      }
      res.send("")
    })
    app.get("/linkE", async function (req, res) {

      async function dd() {
        return new Promise((resolve, reject) => {
          collection.find(
            { ID: parseInt(id) },
            function (err, docs) {
              if (err) {
                console.log(err);
                reject(err);
              }
              Info = docs;
              // console.log(Info);
              resolve({ Info, Wrong });
            })
        })

      }
      const result = await dd();

      if (!isEmpty(result.Info)) {
        console.log("hi")
        console.log(result.Info);
      }
      else {
        emp = true;
      }

      let object = {
        result: result,
        obj1: obj1,
        emp: emp

      };
      res.json(object);
    });






  }
}