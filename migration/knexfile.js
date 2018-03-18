require('dotenv').config();

const getEnvironmentVariable = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

module.exports = {
  local: {
    client: 'mssql',
    connection: {
      server: getEnvironmentVariable('DB_HOST'),
      database: getEnvironmentVariable('DB_NAME'),
      user: getEnvironmentVariable('DB_USERNAME'),
      password: getEnvironmentVariable('DB_PASSWORD'),
    },
    migrations: 'migrations',
  },
};
