function dragElement(element){
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var modelView = element.parentElement.parentElement;
  // Move the DIV from anywhere inside the DIV:
  element.onmousedown = dragMouseDown;
  function dragMouseDown(e){
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }
  function elementDrag(e){
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;

    // New mouse position
    pos3 = e.clientX;
    pos4 = e.clientY;

    // If out of bounds (left,top)
    if(modelView.offsetLeft>element.offsetLeft-pos1||modelView.offsetTop>element.offsetTop-pos2){console.log("Out of bounds: left/top")}
    // If out of bounds (right,bottom)
    else if(modelView.offsetWidth+modelView.offsetLeft-pos1<pos3||modelView.offsetHeight+modelView.offsetTop-pos2<pos4){console.log("Out of bounds: right/bottom")}
    // Else set the element's new position
    else{
      element.style.left = (element.offsetLeft - pos1) + "px";
      element.style.top = (element.offsetTop - pos2) + "px";
    }
  }
  function closeDragElement(){
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
