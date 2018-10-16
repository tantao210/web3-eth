var express = require('express');
var ethResp = require('./../utils/response');

var router = express.Router();

router.get('/count', function(req, res) {
    let number = web3.eth.blockNumber;
    let result = ethResp.success(number);
    res.send(result);
});

// block 是 blockid or block hash
router.get('/:block', function(req, res) {
    var blockid = req.params.block;
    console.log(blockid);
    var result = ethResp.fail();
    block = web3.eth.getBlock(blockid, true);
    // block = web3.eth.getBlock(blockid, true, function(err, obj) {
    //     if (err) { 
    //         console.error(err);
    //         result = ethResp.fail();
    //     } else {
    //         console.log(obj);
    //     }
    // });
    // console.info(block);
    if (block && block.hash) {
        result = ethResp.success(block);
    }
    res.send(result);
});

module.exports = router;