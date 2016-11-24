const test = require('ava');
const {register} = require('../../lib/user');
const {database} = require('../../lib/helpers');

test.cb.before(t => {
    let event = {
        body: 'email=sid@gmail.com&pagerduty=secretkey'
    };
    register(event, null, error => t.end());

});

test.beforeEach(t => {
    database.connect();
});

test.cb('register', t => {
    let event = {
        body: 'email=siddharth.kshetrapal@gmail.com&pagerduty=secretkey'
    };
    let response = register(event, null, (error, {statusCode, body}) => {
        body = JSON.parse(body);

        t.is(statusCode, 201);
        t.is(typeof body.id, 'number');

        t.end();
    });
});

test.cb('re-register', t => {
    let event = {
        body: 'email=sid@gmail.com&pagerduty=secretkey'
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
        body: 'email=invalid@gmail&pagerduty=secretkey'
    };
    let response = register(event, null, (error, {statusCode, body}) => {
        body = JSON.parse(body);

        t.is(statusCode, 400);
        t.is(body.error, 'This email is not valid');

        t.end();
    });
});

test.cb('register without pagerduty key', t => {
    let event = {
        body: 'email=siddharth.kshetrapal@gmail.com'
    };

    let response = register(event, null, (error, {statusCode, body}) => {
        body = JSON.parse(body);

        t.is(statusCode, 400);
        t.is(body.error, 'Pagerduty key is a required field');

        t.end();
    });
});


