const { isEmpty } = require("lodash");
module.exports = {
  teacher: function (app, dic) {
    app.get("/teacher", function (req, res) {
      res.sendFile(dic + "/html/teacher.html");
    });
    var Info;
    var Fname;
    var Mname;
    var Lname;
    var emp = false;
    var email = "";
    var Wrong = false;
    const monk = require("monk");
    const url = "mongodb://0.0.0.0:27017/languages";
    const db = monk(url);
    const collection = db.get("teachers");
    app.post("/teacher-info", (req, res) => {
      Fname = "";
      Mname = "";
      Lname = "";
      email = "";
      Fname = req.body.f_name;
      Mname = req.body.m_name;
      Lname = req.body.l_name;
      email = req.body.Email;
      if ((Fname == "" || Lname == "") && email == "") Wrong = true;
      res.send();
    });

    app.get("/linkk", async function (req, res) {
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
      if(result!=undefined){
      if (!isEmpty(result.Info)) {
        console.log("hi")
        console.log(result.Info);
      }
      else {
        emp = true;
      }
    }
      let object = {
        result: result,
        Wrong: Wrong,
        emp: emp
      };
      res.json(object);
    });
  },
};
