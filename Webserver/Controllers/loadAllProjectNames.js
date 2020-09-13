var path = require("path");
var Projects = require(path.join(__dirname,"../Models/projects.js"));

module.exports = (req,res)=>{
  if(req.session.user){
    var query = {
      user: req.session.user
    };
    console.log(req.session.user);
    Projects.find(query).toArray((error,result)=>{
      if(result){
        res.status(200).send(JSON.stringify(result));
      }
      else{
        res.status(200).send("No results found.");
      }
    });
  }
  else{
    res.status(404).send("You are not logged in.");
  }
}
