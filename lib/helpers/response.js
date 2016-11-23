'use strict';

var handler = function handler(status, content, cb) {
    var response = {
        statusCode: status,
        body: JSON.stringify(content)
    };

    cb(null, response);
};

module.exports = handler;