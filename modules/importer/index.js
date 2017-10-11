const fs = require('fs');
var csvjson = require('csvjson');

class Importer {
    constructor(dirwatcher) {
        dirwatcher.on(dirwatcher.dirChangeEventName, (filenames) => {
            console.log(JSON.stringify(filenames));
        });
    }

    import(path) {
        const files = fs.readdirSync(path);
        const promises = files.map((value) => {
           return new Promise((resolve, reject) => {
                fs.readFile(path + '/' + value, { encoding: 'utf8' }, (err, data) => {
                    if (err) reject(err);
                    var json = csvjson.toObject(data);
                    resolve(json);
                });
            })
        })

        return Promise.all(promises);
    }


    importSync(path) {
        const files = fs.readdirSync(path);
        var results = [];
        files.map((value) => {
            var fileContent = fs.readFileSync(path + '/' + value, { encoding: 'utf8' });
            var json = csvjson.toObject(fileContent);
            results[value] = json;
        });

        return results;
    }
}

module.exports = Importer;