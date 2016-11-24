'use strict';

const database = require('./database');

let handler = (status, content, cb) => {
    let response = {
        statusCode: status,
        body: JSON.stringify(content)
    };

    /*
     * Have to destroy the connection before responding
     * Works without this on local
     * But will fail on lambda
     */
    database.close().then(() => cb(null, response));
};

module.exports = handler;
