'use strict';

const isEmail = require('email-validator').validate;
const {request, response, database} = require('../helpers');

let register = (event, context, cb) => {
    let email = request.param(event, 'email');
    let pagerduty = request.param(event, 'pagerduty');

    /* Validation on email and pagerduty key */
    if (!email) response(400, {error: 'Email is a required field'}, cb);
    else if (!isEmail(email)) response(400, {error: 'This email is not valid'}, cb);
    else if (!pagerduty) response(400, {error: 'Pagerduty key is a required field'}, cb);
    else {

        /*
         * If the user exists already exists,
         * return the id
         * If not, let's create it
         */

        getUser(email).then(user => {
            if (user) response(200, {id: user.id}, cb);
            else createUser(email, pagerduty).then(id => response(201, {id}, cb));
        });
    }
};

/* Get user */
let getUser = (email) => {
    return new Promise(resolve => {
        database.get('users', {email}).then(rows => {
            if (rows.length) resolve(rows[0]);
            else resolve();
        });
    });
};

/* Create user */
let createUser = (email, pagerduty) => {
    return new Promise(resolve => {
        database.insert('users', {email, pagerduty}).then(rows => {
            resolve(rows[0]);
        });
    });

};

module.exports = register;
