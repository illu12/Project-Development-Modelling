/// Packages ///
var path = require("path");

var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

/// Controllers ///
var save_project = require(path.join(__dirname,"/Controllers/save_project.js"));
var get_project = require(path.join(__dirname,"/Controllers/get_project.js"));
var delete_project = require(path.join(__dirname,"/Controllers/delete_project.js"));
var login = require(path.join(__dirname,"/Controllers/login.js"));
var logout = require(path.join(__dirname,"/Controllers/logout.js"));
var newUser = require(path.join(__dirname,"/Controllers/newUser.js"));
var loadAllProjectNames = require(path.join(__dirname,"/Controllers/loadAllProjectNames.js"));

// Main
var app = express();

// Middleware
app.use(express.json());
app.use(express.static("Views"));
app.use(session({
  secret: "ProjectDevelopmentModelling",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));


/// Shadow authentification routes ///
app.get("/",(req,res,next)=>{
  if(req.session.user){
    next();
  }
  else{
    res.redirect("/Html/login.html");
  }
});
app.get("/login",(req,res,next)=>{
  if(req.session.user){
    res.redirect("/Html/index.html");
  }
  else{
    next();
  }
});
app.get("/newUser",(req,res,next)=>{
  if(req.session.user){
    res.redirect("/Html/index.html");
  }
  else{
    next();
  }
});

/// Page redirects ///
app.get("/",(req,res)=>{
  res.redirect("/Html/index.html");
});
app.get("/login",(req,res)=>{
  res.redirect("/Html/login.html");
});
app.get("/newUser",(req,res)=>{
  res.redirect("/Html/newUser.html");
});

/// Peripeheral API Calls ///
// Login
app.post("/api/login",login);
// Logout
app.get("/api/logout",logout);
// New user
app.post("/api/newUser",newUser);


/// Core API Calls ///
// Save project
app.post("/api/save",save_project);
// Get project
app.get("/api/get/:project_name",get_project);
// Delete project
app.get("/api/delete/:project_name",delete_project);
// Load all project names
app.get("/api/loadAllProjectNames",loadAllProjectNames);


// 404 Not found.
app.use((req,res)=>{
  res.status(404).redirect("/Html/404.html");
});

app.listen(2000,()=>{
  console.log("Server running on port 2000 ...");
});
