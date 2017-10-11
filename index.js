const config = require('./config');
const models = require('./models');
const DirWatcher = require('./modules/dirwatcher');
const Importer = require('./modules/importer');

console.log('App name: ', config.name);

//let user = new models.User();
//let product = new models.Product();

let dirwatcher = new DirWatcher();
let importer = new Importer(dirwatcher);
dirwatcher.watch('./data', 1000 * 10);

var data = importer.importSync('./data');

setTimeout(() => {
    var data = importer.import('./data').then((data) => {
        console.log(data, 1);
    })
}, 10000)

console.log(data, 2);

