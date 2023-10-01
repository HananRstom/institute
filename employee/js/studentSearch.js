

module.exports = {
    studentSearch: async (app, dic) => {

        const monk = require("monk");
        const url = "mongodb://0.0.0.0:27017/languages";
        const db = monk(url);
        const collSubject = db.get("subjects");
        const collection = db.get("students");
        let data;
        app.get('/SearchS', async (req, res) => {
            res.sendFile(dic + "/html/studentSearch.html")
            async function nn() {
                return new Promise((resolve, reject) => {
                    collSubject.find(
                        {},
                        function (err, docs) {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            Info = docs;
                            resolve({ Info });
                        }
                    );
                });
            }
            const result = await nn();

            data = result.Info;
        })
        let course;
        app.post("/NumCourse", (req, res) => {
            course = req.body.course;
            console.log(course)
            res.send()
        })
        app.get("/StudentSInfo", async (req, res) => {
            async function Info() {
                return new Promise((resolve, reject) => {
                    collection.find({ courseNumb: parseInt(course) }, function (err, docs) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        Info = docs;
                        resolve({ Info });
                    });

                })
            }
            const result = await Info()
            let dataS = result.Info;
            res.json(dataS)
        })
        app.get("/CourseOptions", (req, res) => {
            res.json(data);
        });

    }
}