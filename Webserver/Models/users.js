var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:3000/ProjectDevelopmentModelling");
var db = mongoose.connection;
module.exports = db.collection("Users");
