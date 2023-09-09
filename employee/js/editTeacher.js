module.exports = {
    editTeacher: function (app, dic) {
      app.get("/editTeacher", function (req, res) {
        res.sendFile(dic + "/html/editTeacher.html");
      });
      const monk = require("monk");
      const url = "mongodb://0.0.0.0:27017/languages";
      const db = monk(url);
      const collection = db.get("teachers");
      var Fname;
      var Mname;
      var Lname;
      var Fname1;
      var Mname1;
      var Lname1;
      var subject1;
      var wage1;
      var Email1 = "";
      var email;
      var obj1;
      var testEmail;
    
       app.post("/teacher-inf", (req, res) => {
      Fname = req.body.f_name;
      Mname = req.body.m_name;
      Lname = req.body.l_name;
      email = req.body.Email;
      if ((Fname == "" || Lname == "") && email == "") Wrong = true;
      res.send();
    });
    app.post("/teachEdit", (req, res) => {
        Fname1 = req.body.f_name;
        Mname1 = req.body.m_name;
        Lname1 = req.body.l_name;
        subject1 = req.body.subject;
        wage1 = req.body.wage;
        Email1 = req.body.Email;
        obj1={
            Fname1:Fname1,
            Mname1:Mname1,
            Lname1:Lname1,
            subject1:subject1,
            wage1:wage1,
            Email1:Email1
        }
        
        res.send();
      });
    
    app.get("/linkE", async function (req, res) {
      async function dd() {
        if (!Wrong) {
          if (email != "") {
            return new Promise((resolve, reject) => {
              collection.find({ email: email }, function (err, docs) {
                if (err) {
                  console.log(err);
                  reject(err);
                }
                Info = docs;
                resolve({ Info, Wrong });
              });
            });
          } else if (Lname != "" && Fname != "" && Mname != "") {
            return new Promise((resolve, reject) => {
              collection.find(
                { Fname: Fname, Lname: Lname, Mname: Mname },
                function (err, docs) {
                  if (err) {
                    console.log(err);
                    reject(err);
                  }
                  Info = docs;
                  console.log(Info);
                  resolve({ Info, Wrong });
                }
              );
            });
          } else if (Lname != "" && Fname != "" && Mname == "") {
            return new Promise((resolve, reject) => {
              collection.find(
                { Fname: Fname, Lname: Lname },
                function (err, docs) {
                  if (err) {
                    console.log(err);
                    reject(err);
                  }
                  Info = docs;
                  console.log(Info);
                  resolve({ Info, Wrong });
                }
              );
            });
          }
        }
      }
      const result = await dd();
      console.log(result.Info);

      let object = {
        result: result,
        Wrong: Wrong,
        obj1:obj1
        
      };
      res.json(object);
    });
    
    
    
    
    

    }}