var argv = require('yargs')
    .alias('a', 'action')
    .nargs('a',1)
    .describe('a', 'action name')
    .alias('f', 'file')
    .nargs('f',1)
    .describe('f', 'file name')
    .demandOption(['a'])
    .help('h')
    .help('h', 'help')
    .epilog('copyright 2017')
    .usage('Usage: $0 --action=io --file=users.csv')
    .usage('Usage: $0 --action=transform-file --file=users.csv')
    .usage('Usage: $0 --action=transform')
    .usage('Usage: $0 -a io -f users.csv')
    .usage('Usage: $0 --help')
    .usage('Usage: $0 -h')
    .argv;

module.exports = argv;

