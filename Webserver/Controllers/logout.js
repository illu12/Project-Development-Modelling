

module.exports = (req,res)=>{
  if(req.session.user){
    req.session.destroy((error)=>{
      if(error){
        res.status(200).send("Error.");
      }
      else{
        res.status(200).send("OK");
      }
    });
  }
  else{
      res.status(200).send("You are not logged in.");
  }
}
