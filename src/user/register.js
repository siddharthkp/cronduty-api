'use strict';

const isEmail = require('email-validator').validate;
const {request, response, database} = require('../helpers');

let register = (event, context, cb) => {
    let email = request.param(event, 'email');

    /* Validation on email */
    if (!email) response(400, {error: 'Email is a required field'}, cb);
    else if (!isEmail(email)) response(400, {error: 'This email is not valid'}, cb);
    else {
        database.get('users', {email}).then(rows => {
            if (rows.length) response(200, {id: rows[0].id}, cb);
            else database.insert('users', {email}).then(rows => {
                console.log(rows);
                response(200, {id: rows[0].id}, cb);
            });
        });
    }

};

module.exports = register;
