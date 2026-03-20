const { Pool } = require("pg");

function createPool(env) {
  return new Pool({
    host: env.dbHost,
    port: env.dbPort,
    user: env.dbUser,
    password: env.dbPassword,
    database: env.dbName,
    connectionTimeoutMillis: env.dbConnectionTimeoutMs,
  });
}

module.exports = { createPool };
