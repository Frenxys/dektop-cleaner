const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.loadFile('dist/index.html');
}

ipcMain.handle('clean-desktop', () => {
  const desktopPath = path.join(os.homedir(), 'Desktop');
  const files = fs.readdirSync(desktopPath);
  const logs = [];

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    let targetFolder = '';

    if (['.jpg', '.png', '.gif'].includes(ext)) targetFolder = 'Pictures';
    else if (['.docx', '.pdf', '.txt'].includes(ext)) targetFolder = 'Documents';
    else if (['.mp4', '.mov'].includes(ext)) targetFolder = 'Videos';
    else if (ext) targetFolder = 'Other';

    if (targetFolder) {
      const fullPath = path.join(desktopPath, file);
      const destDir = path.join(desktopPath, targetFolder);
      const destPath = path.join(destDir, file);

      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
      fs.renameSync(fullPath, destPath);
      logs.push(`Moved ${file} to ${targetFolder}/`);
    }
  });

  return logs;
});

app.whenReady().then(() => {
  createWindow();
});
