module.exports = {
  teacher: function (app, dic) {
    app.get("/teacher", function (req, res) {
      res.sendFile(dic + "/html/teacher.html");
    });
    var Info;
    var Fname;
    var Mname;
    var Lname;
    var Wrong = false;
    const monk = require("monk");
    const url = "mongodb://localhost:27017/languages";
    const db = monk(url);
    var email = ""
    const collection = db.get("teachers");
    app.post("/teacher-info", (req, res) => {
      Fname = req.body.f_name;
      Mname = req.body.m_name;
      Lname = req.body.l_name;
      email = req.body.Email;
      if ((Fname == "" || Lname == "") && email == "")
        Wrong = true;



    });

    app.get("/SearchTeach", async function (req, res) {
      async function dd() {
        if (!Wrong) {
          if (email != "") {
            Info = collection.find({ email: email },
              function (err, docs) {
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
              }).toArray();
          }
          else if (Lname != "") {
            if (Mname == "") {
              Info = collection.find({ Fname: Fname, Lname: Lname },
                function (err, docs) {
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
                }).toArray();

            }
            else {
              Info = collection.find({ Fname: Fname, Mname: Mname, Lname: Lname },
                function (err, docs) {
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
                }).toArray();
            }
          }
        }

        let object = {
          wInfo: Info,
          Wrong: Wrong
        };
        res.json(object);
      }
      await dd();
    });




  },
};
