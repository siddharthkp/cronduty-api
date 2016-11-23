'use strict';

var querystring = require('querystring');

var param = function param(event, key) {
    var body = event.body;
    var params = querystring.parse(body);
    return params[key];
};

module.exports = {
    param: param
};