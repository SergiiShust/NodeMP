const EventEmitter = require('events');
const fs = require('fs');

class DirWatcher extends EventEmitter {
    dirChangeEventName = 'dirwatcher:changed'

    watch(path, delay) {
        this.path && fs.unwatchFile(this.path);
        this.path = path;
        this.delay = delay;
        this.isChanged = false;
        clearInterval(this.intervalHandler);

        fs.watch(path, (eventType, fileName) => {
            console.log(eventType, fileName);
            this.isChanged = true;
        });

        this.watchForChange(this.delay);
    }

    watchForChange(delay) {
        this.intervalHandler = setInterval(() => {
            if (this.isChanged) {
                this.emit(this.dirChangeEventName);
                this.isChanged = false;
            }
        }, delay);
    }
}

module.exports = DirWatcher;