module.exports = {
    book: function (app, dic) {
        app.get("/creat", function (req, res) {
            res.sendFile(dic + "/HTML/creat.html");
        });
    }
}