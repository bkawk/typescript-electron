const electron = require("electron");
const {remote, app, BrowserWindow, Tray, Menu, MenuItem, ipcMain} = electron;
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 900, 
        height: 680, 
        title: 'Agenix',
        webPreferences: {
            nodeIntegration: true,
        }
    });
    mainWindow.loadURL(
    isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.openDevTools();
    mainWindow.on("closed", () => app.quit());
}

const setupMenu = () => {
	const menu = new Menu();
	mainWindow.setMenu(menu);

	const menuTemplate = [{
		label: "Application",
		submenu: [
			{ label: "About Agenix", selector: "orderFrontStandardAboutPanel:" },
			{ type: "separator" },
            { label: "Quit", accelerator: "CmdOrCtrl+Q", click: () => app.quit()}
		]}
	];
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
};

const startup = () => {
    global.appShared = "url";
    app.setAsDefaultProtocolClient('agenix'); 
    createWindow();
    setupMenu();
}
// https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args
// https://medium.com/@jondot/shipping-electron-apps-to-mac-app-store-with-electron-builder-e960d46148ec
// https://github.com/oikonomopo/electron-deep-linking-mac-win

app.on("ready", startup);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
    app.quit();
}
});
app.on("activate", () => {
    if (mainWindow === null) {
    createWindow();
}
});
app.on('web-contents-created', (event, contents) => {
	contents.on('will-navigate', (event, navigationUrl) => {
		if (navigationUrl.indexOf(mainWindow = null(false)) !== 0) {
            event.preventDefault();
        }
	})
})

app.on('open-url',  (event, url) => {
    event.preventDefault();
    mainWindow.webContents.send('deepLinkTo', url.split('/')[2])
    logEverywhere("open-url# " + url.split('/')[2]);
})

process.on('uncaughtException', (err) => {
    mainWindow.webContents.send('error', {message:err.message, file:err.fileName, line:err.lineNumber});
	console.error('There was an uncaught error', err)
});

function logEverywhere(s) {
    console.log(s)
    mainWindow.webContents.executeJavaScript(`console.log("${s}")`);
}