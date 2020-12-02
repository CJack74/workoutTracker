const path = require("path");

module.exports = function(app) {
    app.get("/exercise", function (req,res) {
        res.sendFile(path.join(_dirname,"../public/views/exercise.html"));
    });

    app.get("/" ,function(req,res) {
        res.sendFile(path.join(_dirname,"../public/views/index.html"));
    });
    app.get("/" ,function(req,res) {
        res.sendFile(path.join(_dirname,"../public/views/stats.html"));
    });


}