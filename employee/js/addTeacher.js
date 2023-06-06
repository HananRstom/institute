module.exports = {
    addTeacher: function (app, dic) {
      app.get("/addTeacher", function (req, res) {
        res.sendFile(dic + "/html/addTeacher.html");
      });

      app.post("/teachInfo",(req,res)=>{
        
      })
  
 
    }
  }