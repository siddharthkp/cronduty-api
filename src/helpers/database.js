if (process.env.environment === 'dev') require('dotenv').config();

const host = process.env.DATABASE_HOST;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD || '';
const database = 'cronduty';

let knex;

let connect = () => {
    knex = require('knex')({
        client: 'mysql',
        connection: {host, user, password, database}
    });
};
connect();

let get = (resource, params) => {
    return knex(resource).select().where(params);
};

let insert = (resource, params) => {
    return knex(resource)
    .returning('id')
    .insert(params);
};

let close = () => {
    return knex.destroy();
};

module.exports = {
    connect,
    get,
    insert,
    close
};
