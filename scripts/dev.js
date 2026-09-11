const browserSync = require('browser-sync');
const { compile } = require('./compile-scss');

const bs = browserSync.create();

console.log('⚡ Running initial SCSS compilation...');
compile();

bs.init({
  // Proxy local Laravel Herd server
  proxy: 'http://portfolio.test',
  // Watch files for live reloading / style streaming
  files: [
    {
      match: ['scss/**/*.scss'],
      fn: function (event, file) {
        console.log(`\n🔄 [SCSS] ${event}: ${file}`);
        if (compile()) {
          bs.reload('*.css'); // Injects updated CSS live without full page reload
        }
      },
    },
    'js/**/*.js',
    '*.html',
    'pages/**/*.html',
    'sections/**/*.html',
  ],
  notify: false,
  open: false,
  port: 3000,
  ui: {
    port: 3001,
  },
  ghostMode: false,
});
