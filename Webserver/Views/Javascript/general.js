
/*
This file is for general scripts, such as setting up Quil.
*/

function setup(){
  // Clear localStorage
  localStorage.clear();
  // Set model_view event listener
  document.getElementById("model_view").addEventListener("dblclick",function(event){
    createNode();
  });
  // Quill initialization
  var quill = new Quill('#editor', {
    theme: 'snow'
  });
}

function makeNodesDraggable(){
  var nodes = document.getElementById("node-container").children;
  for(var i=0;i<nodes.length;i++){
    dragElement(nodes[i]);
  }
  return true;
}

function cleanup(){
  // Clear localStorage
  localStorage.clear();
  var parent = document.getElementById("model_view").getElementsByTagName("div")[1];
  while(parent.getElementsByClassName("Node").length!=0){
    parent.removeChild(parent.lastChild);
  }
}

function setZoom(zoom,el){
  transformOrigin = [0,0];
  el = el || instance.getContainer();
  var p = ["webkit", "moz", "ms", "o"],
    s = "scale("+zoom+")",
    oString = (transformOrigin[0]*100)+"% "+(transformOrigin[1]*100)+"%";
  for(var i=0;i<p.length;i++){
    el.style[p[i]+"Transform"] = s;
    el.style[p[i]+"TransformOrigin"] = oString;
  }
  el.style["transform"] = s;
  el.style["transformOrigin"] = oString;
}

function showVal(a){
  var zoomScale = Number(a.value)/10;
  setZoom(zoomScale,document.getElementById("node-container"));
}



function showModalWindow(){
  document.getElementById("modalWindow").style.display = "block";
}

function removeModalWindow(){
  document.getElementById("modalWindow").style.display = "none";
}
