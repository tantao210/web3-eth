var fs = require('fs');

class Settings {
    // port;
    // rpcAddr;
    constructor() {
        console.log('Settings.constructor()');
        this.port = 8300;
        this.rpcAddr = 'http://localhost:8545'
        let path = './config/app.json';
        if (fs.existsSync(path)) {
            let appConfig = JSON.parse(fs.readFileSync(path, 'utf-8'));
            this.port = appConfig.port;
            this.rpcAddr = appConfig.rpcAddr;
        }
    }
    

    

}

var settings = new Settings();

module.exports = settings;