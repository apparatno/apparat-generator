const index = require('./index.js');

console.log('index', index);
// This is the main entrypoint when working locally.
// When running in Google Cloud, it uses index.js, not main.js.
index.makeApparat();
