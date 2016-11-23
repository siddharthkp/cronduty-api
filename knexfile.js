if (process.env.environment === 'dev') require('dotenv').config();

const config = {
    client: 'mysql',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: '',
        database: 'cronduty'
    },
    migrations: {
      tableName: 'migrations'
    }
};

module.exports = {
  development: config,
  staging: config,
  production: config
};
