/* Pretty wrapper around helper functions */

const request = require('./request');
const response = require('./response');
const database = require('./database');

module.exports = {
    request,
    response,
    database
}
