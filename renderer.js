// This file is required by index.html and runs on the browser thread
const { ipcRenderer } = require('electron');
const monacoLoader = require('monaco-loader');
const fs = require('fs');

let editor;
monacoLoader().then(monaco => {
  editor = monaco.editor.create(document.getElementById('container'), {
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true
  });
});

window.onload = () => {
  document.querySelector('#save').onClick(() => {
    saveFile();
  });
}

// Listener for the navigate event sent in index.js
ipcRenderer.on('navigate', (e, url) => {
  // Strip the file:/// in the url
  const filePath = url.slice(7);

  // Read file content and set it into the editor
  fs.readFile(filePath, 'utf-8', (error, result) => {
    if (!error) {
      editor.setModel(monaco.editor.createModel(result, 'javascript'));
    }
  });
});

function saveFile() {
   remote.dialog.showSaveDialog(filename => {
      let data = ''
      let model = editor.getModel();

      model._lines.forEach(line => data += line.text + model._EOL);
      fs.writeFile(filename, data, 'utf-8');
    });
}
// NOTE: Shared value store (redux store) can be sent via ipc as well

