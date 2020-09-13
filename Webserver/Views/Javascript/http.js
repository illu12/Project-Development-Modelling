
// Load all project names
function loadAllProjectNames(){
  fetch("http://localhost:2000/api/loadAllProjectNames")
  .then((res)=>{
    return res.json();
  })
  .then((data)=>{
    // Clear options
    document.getElementById("all_project_names").innerHTML = "";
    // Create placeholder option
    var temp = document.createElement("option");
    temp.value = null;
    temp.innerHTML = "Select a project";
    document.getElementById("all_project_names").appendChild(temp);
    for(var i=0;i<Object.keys(data).length;i++){
      // Create option element
      var option = document.createElement("option");
      option.value = data[Object.keys(data)[i]]["project_name"];
      option.innerHTML = data[Object.keys(data)[i]]["project_name"];

      // Append to parent
      var parent = document.getElementById("all_project_names");
      parent.appendChild(option);
    }
  });
}


// Save current nodes
function save(){
  // Include latest changes in current node
  var temp = {};
  var selected_node_id = document.getElementById("selected_node").value;
  var selected_node = document.getElementById(selected_node_id);
  // Title
  try{
    temp["title"] = selected_node.getElementsByClassName("title")[0].innerHTML;
  }
  catch(e){
    temp["title"] = null;
  }
  // Content
  try{
    temp["content"] = document.getElementById("editor").getElementsByTagName("div")[0].children[1].innerHTML;
  }
  catch(e){
    temp["content"] = null;
  }
  temp["left"] = selected_node.style.left;
  temp["top"] = selected_node.style.top;
  localStorage.removeItem(selected_node_id);
  localStorage.setItem(selected_node_id,JSON.stringify(temp));

  // Prepare object to save
  var obj = {};
  var keys = Object.keys(localStorage);
  for(var i=0;i<localStorage.length;i++){
    obj[i] = JSON.parse(localStorage.getItem(localStorage.key(keys[i])));
  }
  // Get project name
  obj["project_name"] = document.getElementById("project_name").value;
  // Prepare http request
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  }
  fetch("http://localhost:2000/api/save",options)
  .then((res)=>{return res.text();})
  .then((data)=>{alert(data);});
  return true;
}

// Load project
function load(option){
  if(option.value=="null"){
    return false;
  }
  fetch("http://localhost:2000/api/get/"+option.value)
  .then((res)=>{
    return res.json();
  })
  .then((data)=>{
    cleanup();
    document.getElementById("selected_node").value = null;
    var parent = document.getElementById("model_view").getElementsByTagName("div")[1];
    var keys = Object.keys(data).slice(0,Object.keys(data).length-3);
    for(var i=0;i<keys.length;i++){

      // Save to localStorage
      localStorage.setItem(i,JSON.stringify(data[i]));

      // Create node element
      var element = document.createElement("div");
      element.id = document.getElementsByClassName("Node").length;
      element.className = "Node";
      element.style.borderRadius = "50%";
      element.style.left = data[i]["left"];
      element.style.top = data[i]["top"];

      // Delete node button
      var close = document.createElement("img");
      close.className = "close";
      close.src = "http://localhost:2000/Images/close_icon.png";
      element.appendChild(close);

      // Create title element
      var text = document.createElement("h3");
      text.className = "title";
      text.appendChild(document.createTextNode(data[i]["title"]));
      element.appendChild(text);
      parent.appendChild(element);
    }
    // Add three  eventlisteners: clientside saving logic, show node data and close node button
    var nodes = parent.getElementsByClassName("Node");
    for(var i=0;i<nodes.length;i++){
      // Add close node eventlistener
      nodes[i].children[0].addEventListener("click",function(event){
        event.stopPropagation();
        var del = prompt("Delete this node?","yes/no");
        if(del=="yes"){
          // Clear localStorage
          localStorage.removeItem(this.parentElement.id);
          // Close node
          parent.removeChild(this.parentElement);
          // Set previous ndoe to null
          document.getElementById("selected_node").value = "";
        }
        else{
        }
      });
      // Clientside saving logic
      nodes[i].addEventListener("click",function(){
        // Read previous selected node
        var previous_node = document.getElementById("selected_node").value;
        if(previous_node==""){
          document.getElementById("selected_node").value = this.id;
        }
        else{
          // Save to node
          var previous_data = {};
          // Title
          try{
            previous_data["title"] = document.getElementById("editor").getElementsByTagName("div")[0].children[0].innerHTML;
          }
          catch(e){
            previous_data["title"] == null;
          }
          // Content
          try{
            previous_data["content"] = document.getElementById("editor").getElementsByTagName("div")[0].children[1].innerHTML;
          }
          catch(e){
            previous_data["content"] == null;
          }
          // Postioning
          try{
            previous_data["left"] = document.getElementById(previous_node).style.left;
            previous_data["top"] = document.getElementById(previous_node).style.top;
          }
          catch(e){
            previous_data["left"] = null;
            previous_data["top"] = null;
          }
          // Save to localStorage
          localStorage.setItem(previous_node,JSON.stringify(previous_data));
          // Set this node as selected
          document.getElementById("selected_node").value = this.id;
        }
      });
      // onclick: show node data in text_view
      nodes[i].addEventListener("click",function(){
        // Cleanup
        var editor = document.getElementById("editor").getElementsByTagName("div")[0];
        editor.innerHTML = "";
        // Get localStorage data, by element id
        try{
          var data_ = JSON.parse(localStorage.getItem(this.id));
          // Title
          var h2 = document.createElement("h2");
          h2.appendChild(document.createTextNode(this.getElementsByTagName("h3")[0].innerHTML));
          // Content
          var p = document.createElement("p");
          p.appendChild(document.createTextNode(data_["content"]));
          // Append elements
          editor.appendChild(h2);
          editor.appendChild(p);
        }
        catch(e){
          console.log("No data found for node:\t"+this.id);
          // Title
          var h2 = document.createElement("h2");
          h2.appendChild(document.createTextNode(this.getElementsByTagName("h3")[0].innerHTML));
          // Content
          var p = document.createElement("p");
          p.appendChild(document.createTextNode(null));
          // Append elements
          editor.appendChild(h2);
          editor.appendChild(p);
        }
      });
      nodes[i].addEventListener("click",function(event){
        event.stopPropagation();
      });
    }
    // Add change title eventlistener
    var titles = parent.getElementsByClassName("title");
    for(var i=0;i<titles.length;i++){
      titles[i].addEventListener("dblclick",function(){
        event.stopPropagation();
        var temp = prompt("Change your title");
        if(temp.length==0){
          this.innerHTML = "No title!";
        }
        else{
          this.innerHTML = temp;
        }
      });
    }
    makeNodesDraggable();
  });
}

function del(){
  var current_project = document.getElementById("all_project_names").value;
  fetch("http://localhost:2000/api/delete/"+current_project)
  .then((res)=>{
    return res.text();
  })
  .then((data)=>{
    loadAllProjectNames();
    alert(data);
  });
}
