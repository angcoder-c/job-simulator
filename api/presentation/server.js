const express = require("express");
const cors = require("cors");

const { loadEnv } = require("../infrastructure/config/env");
const { createPool } = require("../infrastructure/db/pool");
const { waitForDatabase } = require("../infrastructure/db/wait-for-db");
const { PostgresTaskRepository } = require("../infrastructure/repositories/postgres-task-repository");
const { TaskService } = require("../application/use-cases/task-service");
const { createTaskController } = require("./controllers/task-controller");
const { createTaskRouter } = require("./routes/task-routes");
const { errorHandler, notFoundHandler } = require("./middlewares/error-handler");

async function createServer() {
  const env = loadEnv();
  const pool = createPool(env);

  await waitForDatabase(pool, env.dbWaitRetries, env.dbWaitDelayMs);

  const taskRepository = new PostgresTaskRepository(pool);
  const taskService = new TaskService(taskRepository);
  const taskController = createTaskController(taskService);

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api", createTaskRouter(taskController));
  app.use(notFoundHandler);
  app.use(errorHandler);

  return { app, env, pool };
}

module.exports = { createServer };
