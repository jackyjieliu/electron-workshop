const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWondow;
app.on('ready', () => {
  const index = path.join(__dirname, 'index.html');

  // Start a browser winfow and load the index.html in a new thread
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file:///${index}`);

  // Intercept chrome window navigation
  //   - when a file is dragged into the browser.
  // @param e - event
  // @param url - url tring to navigate to, (or a file path)
  mainWindow.webContents.on('will-navigate', (e, url) => {
    e.preventDefault();
    console.log(`tried to navigatoe to: ${url}`);

    // Send the main window thread an event
    mainWindow.webContents.send('navigate', url);
  });
});