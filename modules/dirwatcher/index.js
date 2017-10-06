const EventEmitter = require('events');
const fs = require('fs');

class DirWatcher extends EventEmitter {
    dirChangeEventName = 'dirwatcher:changed';
    releaseDataPeriod = 1000/* one second*/ * 20 /* seconds*/;
    changedFiles = [];

    watch(path, delay) {
        fs.watch(path, (eventType, fileName) => {
            console.log(eventType, fileName);

            if (this.changedFiles.indexOf(fileName) == -1) {
                this.changedFiles.push(fileName);

                this.delayChangeEvent(delay, () => { this.emitChangedFiles() });
                this.setReleasePeriodHandler(() => { this.emitChangedFiles() });
            }
        });
    }

    delayChangeEvent(delay, cb) {
        clearTimeout(this.intervalHandler);
        this.intervalHandler = setTimeout(() => {
            console.log('IntervalHandler Emit: ', this.dirChangeEventName);
            this.clearHandlers();

            cb();
        }, delay);
    }

    setReleasePeriodHandler(cb) {
        if (this.releaseDataPeriodHandler) {
            return;
        }

        this.releaseDataPeriodHandler = setTimeout(() => {
            console.log('ReleaseDataPeriod Emit: ', this.dirChangeEventName);
            this.clearHandlers();

            cb();
        }, this.releaseDataPeriod);
    }

    emitChangedFiles() {
        this.emit(this.dirChangeEventName, this.changedFiles.slice());
        this.changedFiles = [];
    }

    clearHandlers() {
        clearTimeout(this.intervalHandler);
        clearTimeout(this.releaseDataPeriodHandler);
    }
}

module.exports = DirWatcher;