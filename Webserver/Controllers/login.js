var path = require("path");
var Users = require(path.join(__dirname,"../Models/users.js"));

module.exports = (req,res)=>{
  var query = {
    $and: [
      {
        username: req.body.username
      },
      {
        password: req.body.password
      }
    ]
  };
  Users.findOne(query,(error,result)=>{
    if(result){
      req.session.user = result["_id"];
      res.status(200).send("OK");
    }
    else{
      res.status(200).send("No results found.");
    }
  });
}
