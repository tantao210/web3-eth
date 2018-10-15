function EthAccount(){}

var account = new EthAccount();

EthAccount.prototype.checkAddress = function(address) {
    var regex = /^0x[0-9a-fA-F]{40}$/;
    return regex.test(address);
};

module.exports = account;