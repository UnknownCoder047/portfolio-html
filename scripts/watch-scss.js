const fs = require('fs');
const path = require('path');
const { compile } = require('./compile-scss');

const scssDir = path.resolve(__dirname, '../scss');

console.log('⚡ Initial compilation...');
compile();

console.log(`👀 Watching for SCSS changes in: ${scssDir}`);

let debounceTimer = null;
fs.watch(scssDir, { recursive: true }, (eventType, filename) => {
  if (filename && filename.endsWith('.scss')) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log(`\n[${new Date().toLocaleTimeString()}] 🔄 Change detected in ${filename}. Recompiling...`);
      compile();
    }, 100);
  }
});
