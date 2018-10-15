var express = require('express');
var router = express.Router();
var ethRes = require('./../utils/response');
var ethAccount = require('./../utils/account');

var bodyParser = require('body-parser');

var erc20 = require('./../config/erc20');

var contract = require('./../src/eth/contract');

// 创建账号
var newAccount = function(req, res) {
    var address = web3.personal.newAccount();
    var result;
    if (address && address != '') {
        result = ethRes.success(undefined, {address: address});
    } else {
        result = ethRes.fail('创建账号失败');
    }
    res.send(result);
};

// 获取余额
var getBalance = function(req, res) {
    if (!req.body) return res.sendStatus(400);
    let address = req.body.address;
    let type = req.body.type; // erc20 代币类型
    let name = erc20.getCoinType(type);
    // 验证地址是否有效
    if (!ethAccount.checkAddress(address)) {
        var result = {ret: 1, message: "address 输入有误!~" + address};
        res.send(result);
        return;
    }
    let balance = 0;
    if (erc20.checkEthCoin(name)) {
        balance = web3.eth.getBalance(address);
    } else {
        var myContract = contract.getContract(name);
        balance = myContract.balanceOf(address);
    }
    var result = {ret: 0, balance: web3.fromWei(balance.toString(10), 'ether'), message: 'success'};
    res.send(result);
};

router.post('/create', newAccount);

router.post('/balance', bodyParser.json(), getBalance);

module.exports = router;