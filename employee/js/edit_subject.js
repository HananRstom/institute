module.exports = {
    editSubject: async function (app, dic) {
        const monk = require("monk");
        const url = "mongodb://0.0.0.0:27017/languages";
        const db = monk(url);
        const collSubject = db.get("subjects");
        const collteacher = db.get("teachers");
        let data;
        let course;
        let teacher;
        let sday, smonth, syear;
        let eday, emonth, eyear;
        let hour;
        let days;
        let price;
        let editClass;

        app.get("/editSubject", async function (req, res) {
            res.sendFile(dic + "/html/edit_subject.html");
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

            
                    app.get("/data", (req, res) => {
                        res.json(data);
                    });

        })

        const teachers = [{value:"",text:""}];
        let Stime;
        let ETime;
        app.post("/edit_Subject", async (req, res) => {
            course = parseInt(req.body.course)
            async function nn() {
                return new Promise((resolve, reject) => {
                    collSubject.find(
                        { courseNumb: course },
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
            const Subj = await nn();

            let subject = Subj.Info[0].SubjectName;
            async function findTeacher() {
                return new Promise((resolve, reject) => {
                    collteacher.find(
                        { subject: { $in: [subject] } },
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
            const result = await findTeacher();

            for (let i = 0; i < result.Info.length; i++) {
                teachers.push({
                    value: result.Info[i].email,
                    text: result.Info[i].email,
                });
            }

            price = req.body.price;
            editClass = req.body.class;
            sday = req.body.Sday;
            smonth = req.body.Smonth;
            syear = req.body.Syear;
            eday = req.body.Eday;
            emonth = req.body.Emonth;
            eyear = req.body.Eyear;
            days = req.body.days;
            hour = req.body.hour;
            Stime = syear + "-" + smonth + "-" + sday;
            ETime = eday + "-" + emonth + "-" + eday;

        })
        app.get("/Steachers", (req, res) => {
            res.json(obj3);
        });
        app.post("/confirmS", (req, res) => {
            if (price != "") {
                collSubject.update({ courseNumb: parseInt(course) }, { $set: { Price: price } })
            }
            if (editClass != "") {
                collSubject.update({ courseNumb: parseInt(course) }, { $set: { Class: editClass } })
            }
            if (days != "") {
                collSubject.update({ courseNumb: parseInt(course) }, { $set: { Days: days } })
            }
            if (Email1 != "") {
                collSubject.update({ courseNumb: parseInt(course) }, { $set: { email: Email1 } })
            }
            if (hour != "") {
                collSubject.update({ courseNumb: parseInt(course) }, { $set: { Hour: hour } })
            }

            res.send("")
        })

    }
}   