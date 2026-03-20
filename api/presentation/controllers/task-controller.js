const { AppError } = require("../../domain/errors/app-error");

function parseId(rawId) {
  const parsed = Number.parseInt(rawId, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    throw new AppError(400, "id must be a positive integer");
  }
  return parsed;
}

function createTaskController(taskService) {
  return {
    getAll: async (_req, res, next) => {
      try {
        const tasks = await taskService.getAll();
        res.status(200).json(tasks);
      } catch (error) {
        next(error);
      }
    },

    getOne: async (req, res, next) => {
      try {
        const id = parseId(req.params.id);
        const task = await taskService.getById(id);
        res.status(200).json(task);
      } catch (error) {
        next(error);
      }
    },

    create: async (req, res, next) => {
      try {
        const created = await taskService.create(req.body);
        res.status(201).json(created);
      } catch (error) {
        next(error);
      }
    },

    replace: async (req, res, next) => {
      try {
        const id = parseId(req.params.id);
        const updated = await taskService.replace(id, req.body);
        res.status(200).json(updated);
      } catch (error) {
        next(error);
      }
    },

    patch: async (req, res, next) => {
      try {
        const id = parseId(req.params.id);
        const updated = await taskService.patch(id, req.body);
        res.status(200).json(updated);
      } catch (error) {
        next(error);
      }
    },

    remove: async (req, res, next) => {
      try {
        const id = parseId(req.params.id);
        await taskService.remove(id);
        res.status(204).send();
      } catch (error) {
        next(error);
      }
    },
  };
}

module.exports = { createTaskController };
