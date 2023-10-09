const { isEmpty } = require("lodash");

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
    let showprice;
    async function getData(id) {
      return new Promise((resolve, reject) => {
        collBook.find(
          {
            book_id: id
          },
          function (err, docs) {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve({ Info: docs });
          }
        );
      });
    }

    app.post("/editBook", async function (req, res) {
      error = false;
      id = parseInt(req.body.bookId);
      if (id != "") {
        const result = await getData(id);
        data = result.Info;
      }
      if (id == "" || data.length == 0) error = true;
      res.send();
    });
    let Book, price, totalPrice;
    let NBook = [], NPrice = [];
    app.post("/price", function (req, res) {
      NBook = [];
      NPrice = []
      book = req.body.book;
      totalPrice = 0;
      collBook.findOne({ book_id: id }).then((document) => {
        if (document && document.books && Array.isArray(document.books)) {
          Book = document.books;
          price = document.price;

          for (let i = 0; i < book.length; i++) {
            for (let j = 0; j < Book.length; j++) {
              let Index = -1;
              if (book[i] === Book[j]) {
                Index = j;
                if (Index >= 0) {
                  NBook.push(Book[Index])
                  totalPrice += price[Index];
                  NPrice.push(price[Index]);
                } else {
                  console.log("The index is invalid");
                }
                break;
              }
            }
          }
        } else {
          console.log("Document not found or invalid busy array");
        }
      });

      res.send();
    });
    app.get("/showPrice", function (req, res) {
      showprice = {
        totalPrice: totalPrice,
        Book: NBook,
        price: NPrice,
      };
      res.json(showprice);
    });
    app.post("/delConf", function (req, res) {


      collBook
        .findOne({ book_id: id })
        .then((document) => {
          if (document && document.books && Array.isArray(document.books)) {
            const Book = document.books;
            const price = document.price;
            let totalPrice = document.totalPrice;

            for (let i = 0; i < book.length; i++) {
              for (let j = 0; j < Book.length; j++) {
                let Index = -1;
                if (book[i] === Book[j]) {
                  Index = j;
                  if (Index >= 0) {
                    Book.splice(Index, 1);
                    totalPrice -= price[Index];
                    price.splice(Index, 1);
                  } else {
                    console.log("The index is invalid");
                  }
                  break;
                }
              }
            }
            if (Book.length == 0) {
              return collBook.remove({ book_id: id });
            } else {
              return collBook.update(
                { book_id: id },
                { $set: { books: Book, price: price, totalPrice: totalPrice } }
              );
            }
          } else {
            console.log("Document not found or invalid busy array");
          }
        })
        .then(() => {
          console.log("Deleted book successfully");
        })
        .catch((error) => {
          console.error("Error while deleting row:", error);
        });
      res.send();
    });
    app.get("/showBook", function (req, res) {
      obj = {
        result: data,
        error: error,
      };
      res.json(obj);
    });
  },
};
