
var express = require("express");

var Web3 = require('./index');

var cookieParser = require('cookie-parser');
var multer = require('multer');

var upload = multer(); // for parsing multipart/form-data

var app = require('./router') //express();
// var PORT = 8200;
var settings = require('./config/settings')

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider(settings.rpcAddr));
}

// static file
app.use(express.static('public')); // 静态文件

var server = app.listen(settings.port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app url http://%s:%s', host, port);
});