module.exports = {
  test: function (app, dic) {
    app.get("/test", function (req, res) {
      res.sendFile(dic + "/html/test.html");
    });
    const monk = require("monk");
    const url = "mongodb://0.0.0.0:27017/languages";
    const db = monk(url);
    const collection = db.get("test");

    let Q = [];
    let QA = [];
    let Error = [];
    let correct = [];
    let correct9 = [];
    let correct10 = [];
    app.post("/api/test", (req, res) => {
      for (let i = 1; i <= 10; i++) {
        Error[i] = 0;
        QA[i] = ['', '', '', '', '']
      }

      Q[1] = req.body.Q1;
      Q[2] = req.body.Q2;
      Q[3] = req.body.Q3;
      Q[4] = req.body.Q4;
      Q[5] = req.body.Q5;
      Q[6] = req.body.Q6;
      Q[7] = req.body.Q7;
      Q[8] = req.body.Q8;
      Q[9] = req.body.Q9;
      Q[10] = req.body.Q10;
      QA[1][1] = req.body.Q1A1;
      QA[1][2] = req.body.Q1A2;
      QA[1][3] = req.body.Q1A3;
      QA[2][1] = req.body.Q2A1;
      QA[2][2] = req.body.Q2A2;
      QA[2][3] = req.body.Q2A3;
      QA[3][1] = req.body.Q3A1;
      QA[3][2] = req.body.Q3A2;
      QA[3][3] = req.body.Q3A3;
      QA[4][1] = req.body.Q4A1;
      QA[4][2] = req.body.Q4A2;
      QA[4][3] = req.body.Q4A3;
      QA[5][1] = req.body.Q5A1;
      QA[5][2] = req.body.Q5A2;
      QA[5][3] = req.body.Q5A3;
      QA[6][1] = req.body.Q6A1;
      QA[6][2] = req.body.Q6A2;
      QA[6][3] = req.body.Q6A3;
      QA[7][1] = req.body.Q7A1;
      QA[7][2] = req.body.Q7A2;
      QA[7][3] = req.body.Q7A3;
      QA[8][1] = req.body.Q8A1;
      QA[8][2] = req.body.Q8A2;
      QA[8][3] = req.body.Q8A3;
      QA[9][1] = req.body.Q9A1;
      QA[9][2] = req.body.Q9A2;
      QA[9][3] = req.body.Q9A3;
      QA[9][4] = req.body.Q9A4;
      QA[10][1] = req.body.Q10A1;
      QA[10][2] = req.body.Q10A2;
      QA[10][3] = req.body.Q10A3;
      QA[10][4] = req.body.Q10A4;
      correct[1] = req.body.correct1;
      correct[2] = req.body.correct2;
      correct[3] = req.body.correct3;
      correct[4] = req.body.correct4;
      correct[5] = req.body.correct5;
      correct[6] = req.body.correct6;
      correct[7] = req.body.correct7;
      correct[8] = req.body.correct8;
      correct9 = req.body.correct9;
      correct10 = req.body.correct10;
      for (let i = 1; i <= 8; i++) {
        if (Q[i] != '') {
          if (QA[i][1] == '' || QA[i][2] == '' || QA[i][3] == '' || correct[i] == '') {
            Error[i] = 1
          }
        }
        else if (Q[i] == '') {
          if (QA[i][1] != '' || QA[i][2] != '' || QA[i][3] != '' || correct[i] != '') {
            Error[i] = 1
          }
        }
      }
      for (let i = 9; i <= 10; i++) {
        if (Q[i] != '') {
          if (QA[i][1] == '' || QA[i][2] == '' || QA[i][3] == '' || QA[i][4] == '') {
            Error[i] = 1
          }
        }
        else if (Q[i] == '') {
          if (QA[i][1] != '' || QA[i][2] != '' || QA[i][3] != '' || QA[i][4] != '') {
            Error[i] = 1
          }
        }
      }

      res.send('')
    });
    app.post('/confTest', (req, res) => {
      for (let i = 1; i <= 10; i++) {
        if (Q[i] != '') {
          let Answers = []
          let correctA = [];
          for (let j = 0; j < 4; j++) {
            Answers[j] = QA[i][j + 1]
          }
          if (i < 9) {
            correctA = Answers[correct[i]]
          }
          else if (i == 9) {
            correctA[0] = Answers[correct9[0]]
            correctA[1] = Answers[correct9[1]]
          }
          else if (i == 10) {
            correctA[0] = Answers[correct10[0]]
            correctA[1] = Answers[correct10[1]]
          }
          collection.update({ Question: i }, {
            $set: {
              Content: Q[i],
              Answers: Answers,
              Correct: correctA
            }
          })
        }
      }
      res.send("confirm")
    })

    let obj = {}
    app.get("/api/test", (req, res) => {

      obj = {
        Error: Error,
        correct9: correct9,
        correct10: correct10
      }

      res.json(obj)
    })

  },
};
