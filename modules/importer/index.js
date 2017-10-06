class Importer {
    constructor(dirwatcher) {
        dirwatcher.on(dirwatcher.dirChangeEventName, (filenames) => {
            console.log(JSON.stringify(filenames));
        });
    }
}

module.exports = Importer;