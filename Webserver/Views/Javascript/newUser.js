function newUser(){
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
  fetch("http://localhost:2000/api/newUser",options)
  .then((res)=>{
    return res.text();
  })
  .then((data)=>{
    if(data=="OK"){
      document.location.href = "http://localhost:2000/";
    }
    else{
      alert(data);
    }
  });
}
