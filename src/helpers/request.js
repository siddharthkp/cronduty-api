'use strict';

const querystring = require('querystring');

let param = (event, key) => {
    let body = event.body;
    let params = JSON.parse(body);
    return params[key];
};

module.exports = {
    param
}
