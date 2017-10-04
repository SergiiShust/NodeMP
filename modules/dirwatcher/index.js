const EventEmitter = require('events');
const fs = require('fs');

class DirWatcher extends EventEmitter {
    dirChangeEventName = 'dirwatcher:changed'

    watch(path, delay) {
        this.isChanged = false;

        fs.watch(path, (eventType, fileName) => {
            console.log(eventType, fileName);
            this.isChanged = true;
        });

        this.watchForChange(this.delay);
    }

    watchForChange(delay) {
       setInterval(() => {
            if (this.isChanged) {
                this.emit(this.dirChangeEventName);
                this.isChanged = false;
            }
        }, delay);
    }
}

module.exports = DirWatcher;