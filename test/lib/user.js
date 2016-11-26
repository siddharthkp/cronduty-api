'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var test = require('ava');

var _require = require('../../lib/user'),
    register = _require.register;

var _require2 = require('../../lib/helpers'),
    database = _require2.database;

test.cb.before(function (t) {
    var event = {
        body: JSON.stringify({
            email: 'sid@gmail.com',
            pagerduty: 'secretkey'
        })
    };
    register(event, null, function (error) {
        return t.end();
    });
});

test.beforeEach(function (t) {
    database.connect();
});

test.cb('register', function (t) {
    var event = {
        body: JSON.stringify({
            email: 'sidharth@gmail.com',
            pagerduty: 'secretkey'
        })
    };
    var response = register(event, null, function (error, _ref) {
        var statusCode = _ref.statusCode,
            body = _ref.body;

        body = JSON.parse(body);

        t.is(statusCode, 201);
        t.is(_typeof(body.id), 'number');

        t.end();
    });
});

test.cb('re-register', function (t) {
    var event = {
        body: JSON.stringify({
            email: 'sid@gmail.com',
            pagerduty: 'secretkey'
        })
    };

    var response = register(event, null, function (error, _ref2) {
        var statusCode = _ref2.statusCode,
            body = _ref2.body;

        body = JSON.parse(body);

        t.is(statusCode, 200);
        t.is(_typeof(body.id), 'number');

        t.end();
    });
});

test.cb('register without email', function (t) {
    var event = {
        body: JSON.stringify({})
    };
    var response = register(event, null, function (error, _ref3) {
        var statusCode = _ref3.statusCode,
            body = _ref3.body;

        body = JSON.parse(body);

        t.is(statusCode, 400);
        t.is(body.error, 'Email is a required field');

        t.end();
    });
});

test.cb('register with invalid email', function (t) {
    var event = {
        body: JSON.stringify({
            email: 'invalid@gmail',
            pagerduty: 'secretkey'
        })
    };
    var response = register(event, null, function (error, _ref4) {
        var statusCode = _ref4.statusCode,
            body = _ref4.body;

        body = JSON.parse(body);

        t.is(statusCode, 400);
        t.is(body.error, 'This email is not valid');

        t.end();
    });
});

test.cb('register without pagerduty key', function (t) {
    var event = {
        body: JSON.stringify({
            email: 'sid@gmail.com'
        })
    };

    var response = register(event, null, function (error, _ref5) {
        var statusCode = _ref5.statusCode,
            body = _ref5.body;

        body = JSON.parse(body);

        t.is(statusCode, 400);
        t.is(body.error, 'Pagerduty key is a required field');

        t.end();
    });
});