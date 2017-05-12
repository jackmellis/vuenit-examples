const browser = require('browser-env');
const hooks = require('require-extension-hooks');

browser();
hooks('vue').plugin('vue').push();
hooks(['vue', 'js']).plugin('babel').push();
