if (process.env.environment === 'dev') require('dotenv').config();

const config = {
    client: 'mysql',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD || '',
        database: 'cronduty'
    },
    migrations: {
      tableName: 'migrations'
    }
};

module.exports = {
    development: config,
    travis: config,
    production: config
};
