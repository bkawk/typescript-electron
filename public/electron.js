const electron = require("electron");
const {app, BrowserWindow, Menu, systemPreferences} = electron;
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

    setupMenu();
}

const setupMenu = () => {
	const menu = new Menu();
	mainWindow.setMenu(menu);

	const menuTemplate = [{
		label: "Application",
		submenu: [
			{ label: "About Agenix", selector: "orderFrontStandardAboutPanel:" },
			{ type: "separator" },
            { label: "Quit", accelerator: "CmdOrCtrl+Q", click: () => app.quit() },
            { label: "Back", accelerator: "CmdOrCtrl+B", click: () => window.history.back() },
            { label: 'Reload', accelerator: 'CmdOrCtrl+R', click (item, focusedWindow) {if (focusedWindow) focusedWindow.reload()} }
		]}
	];
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
};

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
    app.quit();
}
});
app.on("activate", () => {
    app.setAsDefaultProtocolClient('agenix'); 
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
    logEverywhere(err);
});

function logEverywhere(s) {
    console.log(s)
    mainWindow.webContents.executeJavaScript(`console.log("${s}")`);
}
