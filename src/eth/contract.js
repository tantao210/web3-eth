var erc20 = require('./../../config/erc20');

class Contract {
    constructor(){}

    getContract(name) {
        let abi = erc20.getABI(name);
        let contractDetail = erc20.getERC20(name);
        console.log(contractDetail);
        let myContract = web3.eth.contract(abi);
        return myContract.at(contractDetail.address);
    }
}

var contract = new Contract;

module.exports = contract;