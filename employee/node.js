const monk = require("monk");
const url = "mongodb://0.0.0.0:27017/languages";
const db = monk(url);
const work = [[" ", " ", " "]];
const collection = db.get("teachers");
collection
.insert({Name:"hi"})
.then((doc) => {
  console.log("Document inserted successfully:", doc);
})
.catch((err) => {
  console.error("Error while inserting document:", err);
})
.then(() => {
  db.close();
});
