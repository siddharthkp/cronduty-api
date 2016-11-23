'use strict';

/* Pretty wrapper around helper functions */

var request = require('./request');
var response = require('./response');
var database = require('./database');

module.exports = {
    request: request,
    response: response,
    database: database
};