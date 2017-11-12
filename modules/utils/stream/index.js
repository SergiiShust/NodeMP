var request = require('request');
var fs = require('fs');
var argv = require('./set-up-command-line.js');

const action = argv.action;
const file = argv.file;

var actions = {};
actions['io'] = inputOutput;

actions[action](file);

function inputOutput(filePath) {
    fs.createReadStream(__dirname + "/" + filePath).pipe(process.stdout);
}

function transformFile(filePath) { /* ... */
}

function transform() { /* ... */
}

function httpClient() { /* ... */
}

function httpServer() { /* ... */
}

function printHelpMessage() { /* ... */
}