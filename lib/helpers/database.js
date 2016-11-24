'use strict';

if (process.env.environment === 'dev') require('dotenv').config();

var host = process.env.DATABASE_HOST;
var user = process.env.DATABASE_USER;
var password = process.env.DATABASE_PASSWORD || '';
var database = 'cronduty';

var knex = void 0;

var connect = function connect() {
    knex = require('knex')({
        client: 'mysql',
        connection: { host: host, user: user, password: password, database: database }
    });
};
connect();

var get = function get(resource, params) {
    return knex(resource).select().where(params);
};

var insert = function insert(resource, params) {
    return knex(resource).returning('id').insert(params);
};

var close = function close() {
    return knex.destroy();
};

module.exports = {
    connect: connect,
    get: get,
    insert: insert,
    close: close
};