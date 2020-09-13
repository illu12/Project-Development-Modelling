var path = require("path");
var Users = require(path.join(__dirname,"../Models/users.js"));

module.exports = (req,res)=>{
  var query = {
    username: req.body.username,
    password: req.body.password
  };
  Users.insertOne(query,(error,result)=>{
    if(result){
      req.session.user = result["insertedId"];
      res.status(200).send("OK");
    }
    else{
      res.status(200).send("Error creating user.");
    }
  });
}
