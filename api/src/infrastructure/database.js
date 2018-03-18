const knexFactory = require('knex');
const appConfig = require('./application-configuration');

const knex = knexFactory({
  client: 'mssql',
  connection: {
    server: appConfig.DB_HOST,
    database: appConfig.DB_NAME,
    user: appConfig.DB_USERNAME,
    password: appConfig.DB_PASSWORD,
  },
});

const queryBuilder = () => knex.queryBuilder();

module.exports = {
  queryBuilder,
};
