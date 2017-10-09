class Importer {
    constructor(dirwatcher) {
        dirwatcher.on(dirwatcher.dirChangeEventName, (filenames) => {
            console.log(JSON.stringify(filenames));
        });
    }

    import(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    import(path) {
        const files = fs.readdirSync(path);
        const promises = files.map((value) => {
            new Promise((resolve, reject) => {
                fs.readFile(path, (err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
            })
        })
        
        return Promise.all(promises);
    }


    importSync(path) {
        const files = fs.readdirSync(path);
        var results = [];
        files.map((value) => {
            results[value] = fs.readFileSync(path + value);
        });

        return results;
    }
}

module.exports = Importer;