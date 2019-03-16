require('dotenv').config();

const getEnvironmentVariable = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const appConfig = {
  DB_HOST: getEnvironmentVariable('DB_HOST'),
  DB_NAME: getEnvironmentVariable('DB_NAME'),
  DB_USERNAME: getEnvironmentVariable('DB_USERNAME'),
  DB_PASSWORD: getEnvironmentVariable('DB_PASSWORD'),
  JWT_SECRET: getEnvironmentVariable('JWT_SECRET'),
  SG_API_KEY: getEnvironmentVariable('SG_API_KEY'),
};

module.exports = appConfig;
