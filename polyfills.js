// polyfills.js
if (typeof window !== 'undefined') {
  // Полифиллы для Node.js модулей в браузере
  window.global = window;
  window.Buffer = require('buffer').Buffer;
  window.process = require('process/browser');
}
