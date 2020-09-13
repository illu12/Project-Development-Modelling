function login(){
  // Set header options
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    })
  };
  // Send http request
  fetch("http://localhost:2000/api/login",options)
  .then((res)=>{
    return res.text();
  })
  .then((data)=>{
    if(data=="OK"){
      document.location.href = "http://localhost:2000/";
    }
    else if(data=="No results found."){
      alert("No users found.");
    }
    else{
      alert("Wrong credentials.");
    }
  });
}
