var express = require('express');


var router = express.Router();

router.get('/', function(req, res) {
    res.send('home response');
});


module.exports = router;