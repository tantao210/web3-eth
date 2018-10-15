function EthResponse() {}
EthResponse.prototype.success = function(data, params) {
    var result = {ret: 0, message: 'success'};
    if (data) result.data = data;
    if (params) {
        // params.forEach(function(item, i) {
        //     result[item] = params[item];
        // });
        for (var key in params) {
            result[key] = params[key];
        }
    }
    return result;
};

EthResponse.prototype.fail = function(message) {
    // if (!message || message == "") {
    //     message = '您提交的请求处理失败';
    // } 
    // var result = {ret: 1, message: message};
    // return result;
    return this.fails(1, message)
};

EthResponse.prototype.fails = function(ret, message, params) {
    if (ret === 0) {
        ret = 1;
    }
    if (!message || message == "") {
        message = '您提交的请求处理失败';
    } 
    var result = {ret: 1, message: message};
    if (params) {
        // params.forEach(function(item, i) {
        //     result[item] = params[item];
        // }); 
        for (var key in params) {
            result[key] = params[key];
        }
    }
    return result;
};

var res = new EthResponse();
module.exports = res;