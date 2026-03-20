const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

function parseIntFromEnv(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number.parseInt(raw, 10);
  return Number.isNaN(value) ? fallback : value;
}

function loadEnv() {
  return {
    appHost: process.env.APP_HOST || "0.0.0.0",
    appPort: parseIntFromEnv("APP_PORT", 8080),
    dbHost: process.env.DB_HOST || "localhost",
    dbPort: parseIntFromEnv("DB_PORT", 5432),
    dbName: process.env.DB_NAME || "job_simulator",
    dbUser: process.env.DB_USER || "postgres",
    dbPassword: process.env.DB_PASSWORD || "postgres",
    dbConnectionTimeoutMs: parseIntFromEnv("DB_CONNECTION_TIMEOUT_MS", 5000),
    dbWaitRetries: parseIntFromEnv("DB_WAIT_RETRIES", 30),
    dbWaitDelayMs: parseIntFromEnv("DB_WAIT_DELAY_MS", 2000),
  };
}

module.exports = { loadEnv };
