var path = require("path");
var Projects = require(path.join(__dirname,"../Models/projects.js"));

module.exports = (req,res)=>{
  if(req.session.user){
    var query = {
      $and: [
        {
          user: req.session.user
        },
        {
          project_name: req.params.project_name
        }
      ]
    };
    Projects.findOne(query,(error,result)=>{
      if(result){
        res.status(200).send(JSON.stringify(result));
      }
      else{
        res.status(200).send("No results found.");
      }
    });
  }
  else{
    res.status(400).send("You are not logged in.");
  }
}
