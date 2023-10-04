module.exports = {
  book: async function (app, dic) {
    app.get("/book", async function (req, res) {
      res.sendFile(dic + "/html/book.html");
    });
    const monk = require("monk");
    const url = "mongodb://0.0.0.0:27017/languages";
    const db = monk(url);
    const collBook = db.get("Book");
    let id;
    let data;
    let obj;
    let error;
    let book;
    app.post("/editBook", async function (req, res) {
        error=false;
      id = parseInt(req.body.bookId);
      if(id!=""){
      async function nn() {
        return new Promise((resolve, reject) => {
          collBook.find({ book_id: id }, function (err, docs) {
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
      console.log(data)}
      if (id=="")
      error=true;
      res.send();
    });
    app.post("/delConf",function(req,res){
        book=req.body.book;
        console.log(book)
        res.send()
    })
    app.get("/showBook", function (req, res) {
      obj = {
        result: data,
        error:error
      };
      res.json(obj);
    });
  },
};
