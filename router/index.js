var express = require('express');

var app = new express();

var homeRouter = require('./../controllers/home');
app.use('/home', homeRouter);

var accountRouter = require('./../controllers/account');
app.use('/account', accountRouter);

var contractRouter = require('./../controllers/contract');
app.use('/contract', contractRouter);

var transactionRouter = require('./../controllers/transaction');
app.use('/transaction', transactionRouter);

var blockRouter = require('./../controllers/block');
app.use('/block', blockRouter);

module.exports = app;