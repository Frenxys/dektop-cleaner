const fs = require('fs');
const path = require('path');
const os = require('os');

document.getElementById('clean').addEventListener('click', () => {
  const desktopPath = path.join(os.homedir(), 'Desktop');
  const files = fs.readdirSync(desktopPath);

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    let targetFolder = '';

    if (['.jpg', '.png', '.gif'].includes(ext)) {
      targetFolder = 'Pictures';
    } else if (['.docx', '.pdf', '.txt'].includes(ext)) {
      targetFolder = 'Documents';
    } else if (['.mp4', '.mov'].includes(ext)) {
      targetFolder = 'Videos';
    } else if (ext) {
      targetFolder = 'Other';
    }

    if (targetFolder) {
      const fullPath = path.join(desktopPath, file);
      const destDir = path.join(desktopPath, targetFolder);
      const destPath = path.join(destDir, file);

      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
      fs.renameSync(fullPath, destPath);

      log(`Moved ${file} to ${targetFolder}/`);
    }
  });
});

function log(msg) {
  const logDiv = document.getElementById('log');
  logDiv.innerHTML += `<p>${msg}</p>`;
}
