function logout(){
  fetch("http://localhost:2000/api/logout")
  .then((res)=>{
    return res.text();
  })
  .then((data)=>{
    if(data=="OK"){
      window.location.href = "http://localhost:2000/login";
    }
    else{
      alert(data);
    }
  });
}
