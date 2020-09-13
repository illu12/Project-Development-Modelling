
// This file is for development scripts,
// reducing iterative testing by creating
// ready-to-go functions to test with.

// Create three nodes with title and content
function setupNodes(){
  for(var i=0;i<3;i++){
    createNode();
  }
  var titles = ["a","b","c"];
  var contents = ["aaa","bbb","ccc"];
  var all_nodes = document.getElementsByClassName("Node");
  for(var i=0;i<all_nodes.length;i++){
    localStorage.setItem(i,JSON.stringify({title:titles[i],content:contents[i]}));
  }
}

function test(){
  createNode();
  dragElement(document.getElementsByClassName("Node")[0]);
  return true;
}

function mouseCords(event){
  console.log(event.clientX);
  console.log(event.clientY);
}
