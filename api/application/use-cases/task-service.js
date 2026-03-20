const { AppError } = require("../../domain/errors/app-error");
const { assertTaskShape, toPersistence } = require("../../domain/entities/task");

class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async getAll() {
    return this.taskRepository.findAll();
  }

  async getById(id) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new AppError(404, "Task not found");
    }
    return task;
  }

  async create(payload) {
    const body = payload && Array.isArray(payload.tasks) ? payload.tasks : payload;

    if (Array.isArray(body)) {
      if (body.length === 0) {
        throw new AppError(400, "tasks array cannot be empty");
      }

      const records = body.map((item) => {
        assertTaskShape(item, false);
        return toPersistence(item);
      });

      return this.taskRepository.createMany(records);
    }

    assertTaskShape(body, false);
    return this.taskRepository.createOne(toPersistence(body));
  }

  async replace(id, payload) {
    assertTaskShape(payload, false);
    const updated = await this.taskRepository.updateOne(id, toPersistence(payload));

    if (!updated) {
      throw new AppError(404, "Task not found");
    }

    return updated;
  }

  async patch(id, payload) {
    assertTaskShape(payload, true);
    const changes = {};

    if ("campo1" in payload) changes.title = payload.campo1.trim();
    if ("campo2" in payload) changes.content = payload.campo2.trim();
    if ("campo3" in payload) changes.author = payload.campo3.trim();
    if ("campo4" in payload) changes.priority = payload.campo4;
    if ("campo5" in payload) changes.rate = payload.campo5;
    if ("campo6" in payload) changes.complete = payload.campo6;

    const updated = await this.taskRepository.patchOne(id, changes);
    if (!updated) {
      throw new AppError(404, "Task not found");
    }

    return updated;
  }

  async remove(id) {
    const deleted = await this.taskRepository.deleteOne(id);
    if (!deleted) {
      throw new AppError(404, "Task not found");
    }
  }
}

module.exports = { TaskService };
