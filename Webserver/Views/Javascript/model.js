
/*
This file is for the model scripts, such as creating a node.
*/

function createNode(){
  // Get model_view element
  var parent = document.getElementById("node-container");
  // Create node element
  var element = document.createElement("div");
  // Set unique id
  for(var i=0;i<500;i++){
    if(!document.getElementById(i)){
      element.id = i;
      break;
    }
  }
  element.className = "Node";
  // Decide if circle or square
  var node_geometry = prompt("Circle or square node? 0 or 1");
  if(node_geometry==null){
    return;
  }
  if(node_geometry=="0"){
    element.style.borderRadius = "50%";
  }
  if(node_geometry=="1"){
  }
  // Clientside saving logic
  element.addEventListener("click",function(){
    // Read previous selected node
    var previous_node = document.getElementById("selected_node").value;
    // If no previous node was selected
    if(previous_node==""){
      // Set this node as selected
      document.getElementById("selected_node").value = element.id;
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
      document.getElementById("selected_node").value = element.id;
    }
  });

  // onclick: show node data in text_view
  element.addEventListener("click",function(){
    // Cleanup
    var editor = document.getElementById("editor").getElementsByTagName("div")[0];
    editor.innerHTML = "";
    // Get localStorage data, by element id
    try{
      var data = JSON.parse(localStorage.getItem(this.id));
      // Title
      var h2 = document.createElement("h2");
      h2.appendChild(document.createTextNode(this.getElementsByTagName("h3")[0].innerHTML));
      // Content
      var p = document.createElement("p");
      p.appendChild(document.createTextNode(data["content"]));
      // Append elements
      editor.appendChild(h2);
      editor.appendChild(p);
    }
    catch(e){
      console.log("No data found for node:"+this.id);
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
  element.addEventListener("click",function(event){
    event.stopPropagation();
  });

  // Delete node button
  var close = document.createElement("img");
  close.className = "close";
  close.src = "http://localhost:2000/Images/close_icon.png";
  close.addEventListener("click",function(event){
    var del = prompt("Delete this node?","yes/no");
    if(del=="yes"){
      // Clear localStorage
      localStorage.removeItem(element.id);
      // Close node
      event.stopPropagation();
      parent.removeChild(element);
    }
    else{
    }
  });
  element.appendChild(close);

  // Enter a title
  var input = prompt("Enter a title for the node:");
  if(input==null){
    return;
  }
  else{
    if(input.length==0){
      input = "No title!";
    }
    var text = document.createElement("h3");
    text.className = "title";
    text.appendChild(document.createTextNode(input));
    //text.style.margin = "2.5em auto";
    text.addEventListener("dblclick",function(){
      event.stopPropagation();
      var temp = prompt("Change your title");
      if(!temp){
        text.innerHTML = "No title!";
      }
      else{
        text.innerHTML = temp;
      }
    });
    element.appendChild(text);
    parent.appendChild(element);
    dragElement(document.getElementById(element.id));
  }
}
