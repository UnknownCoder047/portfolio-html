const fs = require('fs');
const path = require('path');
const sass = require('sass');

const srcFile = path.resolve(__dirname, '../scss/main.scss');
const outDir = path.resolve(__dirname, '../css');
const outFile = path.join(outDir, 'style.css');
const outMinFile = path.join(outDir, 'style.min.css');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function compile() {
  const startTime = Date.now();
  try {
    // Expanded CSS
    const result = sass.compile(srcFile, {
      style: 'expanded',
      sourceMap: false,
    });
    fs.writeFileSync(outFile, result.css);

    // Minified CSS
    const resultMin = sass.compile(srcFile, {
      style: 'compressed',
      sourceMap: false,
    });
    fs.writeFileSync(outMinFile, resultMin.css);

    const duration = Date.now() - startTime;
    console.log(`[${new Date().toLocaleTimeString()}] ✔ SCSS compiled successfully (${duration}ms) -> css/style.css & css/style.min.css`);
    return true;
  } catch (err) {
    console.error(`[${new Date().toLocaleTimeString()}] ✖ SCSS Compilation Error:\n`, err.message);
    return false;
  }
}

if (require.main === module) {
  compile();
}

module.exports = { compile };
