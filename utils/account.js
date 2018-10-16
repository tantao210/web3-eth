function EthAccount(){}

var account = new EthAccount();

EthAccount.prototype.checkAddress = function(address) {
    var regex = /^0x[0-9a-fA-F]{40}$/;
    return regex.test(address);
};

// 取自 web3 utils isTopic 方法
EthAccount.prototype.isTopic = function (topic) {
    if (!/^(0x)?[0-9a-f]{64}$/i.test(topic)) {
        return false;
    } else if (/^(0x)?[0-9a-f]{64}$/.test(topic) || /^(0x)?[0-9A-F]{64}$/.test(topic)) {
        return true;
    }
    return false;
};

module.exports = account;