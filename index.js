const config = require('./config');
const models = require('./models');
const DirWatcher = require('./modules/dirwatcher')
console.log('App name: ', config.name);

//let user = new models.User();
//let product = new models.Product();

let dirwatcher = new DirWatcher();
dirwatcher.watch('./data', 200)
dirwatcher.on(dirwatcher.dirChangeEventName, (filename) => {
    console.log(dirwatcher.dirChangeEventName);
});

