module.exports = {
  editBook: async function (app, dic) {
    app.get("/editPrice", function (req, res) {
      res.sendFile(dic + "/html/editBook.html");
    });
    let book;
    let price;
    const monk = require("monk");
    const url = "mongodb://0.0.0.0:27017/languages";
    const db = monk(url);
    const collBookPrice = db.get("bookPrice");
    app.post("/editPrice", async function (req, res) {
      book = "";
      price = "";
      book = req.body.book;
      price = parseInt(req.body.price);
      if (book != "" && price != "") {
        collBookPrice.update({ name: book }, { $set: { price: price } });
      } res.send("Upate price");
    });
  },
};
