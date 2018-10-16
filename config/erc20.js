var fs = require('fs')

function ERC20() {}

ERC20.prototype.list = [
    'eth', // 0
    'bnb', // 1
    'bnt', // 2
    'ocn', // 3
    'ven', // 4
];

ERC20.prototype.getCoinType = function(type) {
    if (isNaN(type) || (type < 0 && type >= this.list.length)) {
        type = 0;
    }
    return this.list[type];    
};

// 是否是eth
ERC20.prototype.checkEthCoin = function(name) {
    return name.toLowerCase() == 'eth';
};


ERC20.prototype.getABI = function(name) {
    let path = './config/' + name + '/abi.json';
    if (fs.existsSync(path)) {
        return JSON.parse(fs.readFileSync(path, 'utf-8'));
    }
    return undefined;
};

ERC20.prototype.getERC20 = function(name) {
    let path = './config/erc20.json';
    if (fs.existsSync(path)) {
        let list = JSON.parse(fs.readFileSync(path, 'utf-8'));
        // if (list[name]) {
        //     return list[name];
        // }
        return list[name];
    }
    return undefined;
};

ERC20.prototype.getData = function(name) {
    let path = './config/' + name + '/data.txt';
    if (fs.existsSync(path)) {
        return fs.readFileSync(path, 'utf-8');
    }
    return undefined;
};

ERC20.prototype.addERC20 = function(name, address, transactionHash) {
    let path = './config/erc20.json';
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '{}', function(err) {
            if (err) throw err;
        });
    }
    let list = JSON.parse(fs.readFileSync(path, 'utf-8'));
    list[name] = {address: address, transactionHash: transactionHash}; // 如果存在直接覆盖
    
    fs.writeFileSync(path, JSON.stringify(list), function(err) {
        if (err) throw err;
    });
    return true;
};


var erc20 = new ERC20;
module.exports = erc20;