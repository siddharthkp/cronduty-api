'use strict';

var isEmail = require('email-validator').validate;

var _require = require('../helpers'),
    request = _require.request,
    response = _require.response,
    database = _require.database;

var register = function register(event, context, cb) {
    var email = request.param(event, 'email');
    var pagerduty = request.param(event, 'pagerduty');

    /* Validation on email and pagerduty key */
    if (!email) response(400, { error: 'Email is a required field' }, cb);else if (!isEmail(email)) response(400, { error: 'This email is not valid' }, cb);else if (!pagerduty) response(400, { error: 'Pagerduty key is a required field' }, cb);else {

        /*
         * If the user exists already exists,
         * return the id
         * If not, let's create it
         */

        getUser(email).then(function (user) {
            if (user) response(200, { id: user.id }, cb);else createUser(email, pagerduty).then(function (id) {
                return response(201, { id: id }, cb);
            });
        });
    }
};

/* Get user */
var getUser = function getUser(email) {
    return new Promise(function (resolve) {
        database.get('users', { email: email }).then(function (rows) {
            if (rows.length) resolve(rows[0]);else resolve();
        });
    });
};

/* Create user */
var createUser = function createUser(email, pagerduty) {
    return new Promise(function (resolve) {
        database.insert('users', { email: email, pagerduty: pagerduty }).then(function (rows) {
            resolve(rows[0]);
        });
    });
};

module.exports = register;