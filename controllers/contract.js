var express = require('express');

var erc20 = require('./../config/erc20');

var ethResp = require('./../utils/response');

var router = express.Router();

router.post('/deploy/bnt', function (req, res) {
    var _config = web3.eth.accounts[0];
    web3.personal.unlockAccount(_config, '123456');
    var _name = "BNT"; /* var of type string here */
    var _symbol = "BNT"; /* var of type string here */
    var _decimals = 18; /* var of type uint8 here */
    let abi = erc20.getABI(_name.toLowerCase());
    let data = erc20.getData(_name.toLowerCase());
    var erc20tokenContract = web3.eth.contract(abi);
    let result = ethResp.fail();
    var erc20token = erc20tokenContract.new(
        _name,
        _symbol,
        _decimals,
        {
            from: _config,
            data: data,
            gas: '4700000'
        }, function (e, contract) {
            if (e) {
                console.error(e);
            }
            // console.log(e, contract);
            if (typeof contract.address !== 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                result = ethResp.success(undefined, { address: contract.address, transactionHash: contract.transactionHash });
                erc20.addERC20(_name.toLowerCase(), contract.address, contract.transactionHash);
            }
        });
    res.send(result);
});

router.post('/deploy/bnb', function (req, res) {
    var _config = web3.eth.accounts[0];
    web3.personal.unlockAccount(_config, '123456');
    var initialSupply = web3.toWei(100000000);/* var of type uint256 here */
    var tokenName = "BNB";/* var of type string here */
    var decimalUnits = 18;/* var of type uint8 here */
    var tokenSymbol = "BNB";/* var of type string here */
    let result = ethResp.fail();
    let abi = erc20.getABI(tokenName.toLowerCase());
    let data = erc20.getData(tokenName.toLowerCase());
    var bnbContract = web3.eth.contract(abi);
    var bnb = bnbContract.new(
        initialSupply,
        tokenName,
        decimalUnits,
        tokenSymbol,
        {
            from: _config,
            data: data,
            gas: '4700000'
        }, function (e, contract) {
            if (e) {
                console.error(e);
            }
            // console.log(e, contract);
            if (typeof contract.address !== 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                result = ethResp.success(undefined, { address: contract.address, transactionHash: contract.transactionHash });
                erc20.addERC20(tokenName.toLowerCase(), contract.address, contract.transactionHash);
            }
        });
    res.send(result);
});

router.post('/deploy/ocn', function (req, res) {
    let name = 'OCN';
    var _config = web3.eth.accounts[0];
    web3.personal.unlockAccount(_config, '123456');
    let result = ethResp.fail();
    let abi = erc20.getABI(name.toLowerCase());
    let data = erc20.getData(name.toLowerCase());
    var ocoinContract = web3.eth.contract(abi);    
    var ocoin = ocoinContract.new(
        {
            from: web3.eth.accounts[0],
            data: data,
            gas: '4700000'
        }, function (e, contract) {
            if (e) {
                console.error(e);
            }
            if (typeof contract.address !== 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                result = ethResp.success(undefined, { address: contract.address, transactionHash: contract.transactionHash });
                erc20.addERC20(name.toLowerCase(), contract.address, contract.transactionHash);
            }
            
        });
        res.send(result);
});

router.post('/deploy/ven', function(req, res) {
    let name = 'VEN';
    var _config = web3.eth.accounts[0];
    web3.personal.unlockAccount(_config, '123456');
    let result = ethResp.fail();
    let abi = erc20.getABI(name.toLowerCase());
    let data = erc20.getData(name.toLowerCase());
    var vensaleContract = web3.eth.contract(abi);
    var vensale = vensaleContract.new(
    {
        from: web3.eth.accounts[0], 
        data: data, 
        gas: '4700000'
    }, function (e, contract){
        if (e) {
            console.error(e);
        }
        if (typeof contract.address !== 'undefined') {
            console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
            result = ethResp.success(undefined, { address: contract.address, transactionHash: contract.transactionHash });
            erc20.addERC20(name.toLowerCase(), contract.address, contract.transactionHash);
        }
    });
    res.send(result);
});

router.get('/deploy/test', function (req, res) {
    let _name = 'TNT';
    let address = '0x5fd702b9f19ad1a87761dc689b938210464e0635';
    let transactionHash = '0xb6513d33d9a02a7bec46918049b4b2798072b7a20784a799be8acf8800765faa';
    let flag = erc20.addERC20(_name.toLowerCase(), address, transactionHash);
    res.send(flag ? ethResp.success() : ethResp.fail());
});

module.exports = router;