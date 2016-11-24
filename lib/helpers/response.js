'use strict';

var database = require('./database');

var handler = function handler(status, content, cb) {
    var response = {
        statusCode: status,
        body: JSON.stringify(content)
    };

    /*
     * Have to destroy the connection before responding
     * Works without this on local
     * But will fail on lambda
     */
    database.close().then(function () {
        return cb(null, response);
    });
};

module.exports = handler;