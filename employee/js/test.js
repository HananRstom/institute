module.exports = {
  test: function (app, dic) {
    app.get("/test", function (req, res) {
      res.sendFile(dic + "/html/test.html");
    });
    const monk = require("monk");
    const url = "mongodb://0.0.0.0:27017/languages";
    const db = monk(url);
    const collection = db.get("");
    let Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10;
    let Q1A1,
      Q1A2,
      Q1A3,
      Q2A1,
      Q2A2,
      Q2A3,
      Q3A1,
      Q3A2,
      Q3A3,
      Q4A1,
      Q4A2,
      Q4A3,
      Q5A1,
      Q5A2,
      Q5A3,
      Q6A1,
      Q6A2,
      Q6A3,
      Q7A1,
      Q7A2,
      Q7A3,
      Q8A1,
      Q8A2,
      Q8A3,
      Q9A1,
      Q9A2,
      Q9A3,
      Q9A4,
      Q10A1,
      Q10A2,
      Q10A3,
      Q10A4;
    app.post("/api/test", (req, res) => {
        Q1=req.body.Q1;
        Q2=req.body.Q2;
        Q3=req.body.Q3;
        Q4=req.body.Q4;
        Q5=req.body.Q5;
        Q6=req.body.Q6;
        Q7=req.body.Q7;
        Q8=req.body.Q8;
        Q9=req.body.Q9;
        Q10=req.body.Q10;
        Q1A1=req.body.Q1A1;
        Q1A2=req.body.Q1A2;
        Q1A3=req.body.Q1A3;
        Q2A1=req.body.Q2A1;
        Q2A2=req.body.Q2A2;
        Q2A3=req.body.Q2A3;
        Q3A1=req.body.Q3A1;
        Q3A2=req.body.Q3A2;
        Q3A3=req.body.Q3A3;
        Q4A1=req.body.Q4A1;
        Q4A2=req.body.Q4A2;
        Q4A3=req.body.Q4A3;
        Q5A1=req.body.Q5A1;
        Q5A2=req.body.Q5A2;
        Q5A3=req.body.Q5A3;
        Q6A1=req.body.Q6A1;
        Q6A2=req.body.Q6A2;
        Q6A3=req.body.Q6A3;
        Q7A1=req.body.Q7A1;
        Q7A2=req.body.Q7A2;
        Q7A3=req.body.Q7A3;
        Q8A1=req.body.Q8A1;
        Q8A2=req.body.Q8A2;
        Q8A3=req.body.Q8A3;
        Q9A1=req.body.Q9A1;
        Q9A2=req.body.Q9A2;
        Q9A3=req.body.Q9A3;
        Q9A4=req.body.Q9A4;
        Q10A1=req.body.Q10A1;
        Q10A2=req.body.Q10A2;
        Q10A3=req.body.Q10A3;
        Q10A4=req.body.Q10A4;








    });
  },
};
