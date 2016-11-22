'use strict';
const {request, response} = require('../helpers');

let register = (event, context, cb) => {
    let email = request.param(event, 'email');
    if (!email) response(400, {error: 'Email is a required field'}, cb);
    else response(200, {email}, cb);
};

module.exports = register;
