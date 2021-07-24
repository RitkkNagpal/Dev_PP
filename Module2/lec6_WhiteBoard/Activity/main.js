const { BrowserWindow } = require("electron");
const electron = require("electron");

const app=electron.app;

const browserWindow=electron.BrowserWindow;

function createWindow(){
    const mainWindow=new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            nodeIntegration:true // enables node in this app
        }
    })

    mainWindow.loadFile("index.html").then(function(){
        mainWindow.webContents.openDevTools(); //opens dev tools in our app
        mainWindow.maximize();
        mainWindow.removeMenu();
    });
}

app.whenReady().then(function(){
    createWindow();
});