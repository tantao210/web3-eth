var express = require('express');
var bodyParser = require('body-parser');
var ethResp = require('./../utils/response');
var ethAccount = require('./../utils/account');
var erc20 = require('./../config/erc20');
var contract = require('./../src/eth/contract');
var router = express.Router();

router.get('/:transactionHash', function(req, res) {
    let hash = req.params.transactionHash;
    let result = ethResp.fail();
    // console.log(web3.utils.isString(999));
    // console.log(web3);
    if (ethAccount.isTopic(hash)) {
        let transaction = web3.eth.getTransaction(hash);        
        if (transaction && transaction.hash) {
            result = ethResp.success(transaction);
        }
    } 
    res.send(result); 
});

router.post('/send', bodyParser.json(), function(req, res) {
    // if (!req.body) return res.sendStatus(400);
    var from = req.body.from;
    var to = req.body.to;
    var value = req.body.value;
    var type = req.body.type;
    if (from == '') {
        result = ethResp.fail();
        res.send(result);
        return;
    }
    if (!ethAccount.checkAddress(from)) {
        result = ethResp.fail('from 地址格式不正确!');
        res.send(result);
        return;
    }
    if (to == '') {
        result = ethResp.fail();
        res.send(result);
        return;
    }
    if (!ethAccount.checkAddress(to)) {
        result = ethResp.fail('to 地址格式不正确!');
        res.send(result);
        return;
    }
    if (value == '' || web3.toDecimal(value) <= 0) {
        result = ethResp.fail();
        res.send(result);
        return;
    }
    let name = erc20.getCoinType(type);
    web3.personal.unlockAccount(from, '123456');// unlock account
    var hash;
    if (erc20.checkEthCoin(name)) {
        hash = web3.eth.sendTransaction({from: from, to: to, value: web3.toWei(value, 'ether')});
    } else {
        let mycontract = contract.getContract(name);
        hash = mycontract.transfer(to, web3.toWei(value), {from: from});
    }
    // console.log(result);

    res.send(ethResp.success({hash: hash}));
});

module.exports = router;