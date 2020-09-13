var path = require("path");
var Projects = require(path.join(__dirname,"../Models/projects.js"));

module.exports = (req,res)=>{
  if(req.session.user){
    var query = {
      user: req.session.user,
      project_name: req.body.project_name
    };
    for(var i=0;i<Object.keys(req.body).length;i++){
      query[Object.keys(req.body)[i]] = req.body[Object.keys(req.body)[i]]
    }
    Projects.insertOne(query,(error,result)=>{
      if(result){
        res.status(200).send("Succesfully inserted project.");
      }
      else{
        res.status(200).send("Error while inserting project.");
      }
    });
  }
  else{
    res.status(400).send("You are not logged in.");
  }
}
