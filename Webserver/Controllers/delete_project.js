var path = require("path");
var Projects = require(path.join(__dirname,"../Models/projects.js"));

module.exports = (req,res)=>{
  var query = {
    project_name: req.params.project_name
  };
  Projects.deleteOne(query,(error,result)=>{
    if(result){
      res.status(200).send("OK");
    }
    else{
      res.status(200).send("No results found.");
    }
  });
}
