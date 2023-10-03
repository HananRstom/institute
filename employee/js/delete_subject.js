module.exports = {
  deleteSubject: async function (app, dic) {
    const monk = require("monk");
    const url = "mongodb://0.0.0.0:27017/languages";
    const db = monk(url);
    const collSubject = db.get("subjects");
    const collteacher = db.get("teachers");
    const collclass = db.get("class");
    const collStudent = db.get("students");
    let course;
    let obj;
    
    app.get("/deleteSubject", async function (req, res) {
      res.sendFile(dic + "/html/delete_subject.html");
      async function nn() {
        return new Promise((resolve, reject) => {
          collSubject.find({}, function (err, docs) {
            if (err) {
              console.log(err);
              reject(err);
            }
            Info = docs;
            resolve({ Info });
          });
        });
      }
      const result = await nn();

      data = result.Info;

      app.get("/data1", (req, res) => {
        res.json(data);
      });
    });
    app.post("/delete1",function(req,res){
      
      
        course = parseInt(req.body.course);
        console.log(course)
      
        res.send();
    })
    app.post("/delConfirm",function(req,res){
      if(course!=""){
        collSubject.deleteOne({courseNumb:course})
      }
      res.send();
    })
    app.get("/delsub",function(req,res){
     
      obj={
       course:course,
      }
      res.json(obj)
    })
  },
};
