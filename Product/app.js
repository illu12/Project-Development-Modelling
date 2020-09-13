var {app,BrowserWindow} = require("electron");





function initProgram(){
  var win = new BrowserWindow({
    width: 1000,
    height: 700,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences:{
      devTools: true
    }
  });
  win.loadURL("http://localhost:2000/");
  win.webContents.reloadIgnoringCache();
  win.show();
}


app.on("ready",initProgram);
