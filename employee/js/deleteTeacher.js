const { isEmpty } = require("lodash")
module.exports = {
    deleteTeacher: function (app, dic) {
        app.get("/deleteTeacher", function (req, res) {
            res.sendFile(dic + "/html/deleteTeacher.html");
        })
        var id;
        const monk = require("monk");
        const url = "mongodb://0.0.0.0:27017/languages";
        const db = monk(url);
        const collection = db.get("teachers");
        var emp = false
        app.post("/delete", function (req, res) {
            emp = false;
            id = ""
            id = req.body.id;
            res.send();
        })
        app.post("/confirmD", (req, res) => {
            collection.remove({ ID: parseInt(id) }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.send("");
                }
            });
        });
        app.get("/linkD", async function (req, res) {
            async function dd() {
                return new Promise((resolve, reject) => {
                    collection.find(
                        { ID: parseInt(id) },
                        function (err, docs) {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            Info = docs;
                            // console.log(Info);
                            resolve({ Info });
                        })
                })

            }
            const result = await dd();

            if (!isEmpty(result.Info)) {
                console.log("hi")
                console.log(result.Info);
            }
            else {
                emp = true;
            }

            let object = {
                result: result,

                emp: emp

            };
            res.json(object);
        });
    }
}