const test = require('ava');
const {register} = require('../src/user.js');

test.cb('register with email', t => {
    let event = {
        body: 'email=siddharth.kshetrapal@gmail.com'
    };
    let response = register(event, null, (error, {statusCode, body}) => {
        body = JSON.parse(body);

        t.is(statusCode, 200);
        t.is(typeof body.id, 'number');

        t.end();
    });
});

test.cb('register without email', t => {
    let event = {};
    let response = register(event, null, (error, {statusCode, body}) => {
        body = JSON.parse(body);

        t.is(statusCode, 400);
        t.is(body.error, 'Email is a required field');

        t.end();
    });
});

test.cb('register with invalid email', t => {
    let event = {
        body: 'email=fake@gmail'
    };
    let response = register(event, null, (error, {statusCode, body}) => {
        body = JSON.parse(body);

        t.is(statusCode, 400);
        t.is(body.error, 'This email is not valid');

        t.end();
    });
});

