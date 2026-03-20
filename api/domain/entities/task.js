const { AppError } = require("../errors/app-error");

const REQUIRED_FIELDS = ["campo1", "campo2", "campo3", "campo4", "campo5", "campo6"];

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function assertTaskShape(input, partial = false) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new AppError(400, "Request body must be a JSON object");
  }

  if (!partial) {
    const missing = REQUIRED_FIELDS.filter((key) => !(key in input));
    if (missing.length > 0) {
      throw new AppError(400, "Missing required fields", { missing });
    }
  }

  if (partial) {
    const providedKeys = REQUIRED_FIELDS.filter((key) => key in input);
    if (providedKeys.length === 0) {
      throw new AppError(400, "PATCH body must include at least one updatable field");
    }
  }

  if ("campo1" in input && !isNonEmptyString(input.campo1)) {
    throw new AppError(400, "campo1 must be a non-empty string");
  }

  if ("campo2" in input && !isNonEmptyString(input.campo2)) {
    throw new AppError(400, "campo2 must be a non-empty string");
  }

  if ("campo3" in input && !isNonEmptyString(input.campo3)) {
    throw new AppError(400, "campo3 must be a non-empty string");
  }

  if ("campo4" in input && !Number.isInteger(input.campo4)) {
    throw new AppError(400, "campo4 must be an integer");
  }

  if ("campo5" in input && (typeof input.campo5 !== "number" || Number.isNaN(input.campo5))) {
    throw new AppError(400, "campo5 must be a float");
  }

  if ("campo6" in input && typeof input.campo6 !== "boolean") {
    throw new AppError(400, "campo6 must be a boolean");
  }
}

function toPersistence(task) {
  return {
    title: task.campo1.trim(),
    content: task.campo2.trim(),
    author: task.campo3.trim(),
    priority: task.campo4,
    rate: task.campo5,
    complete: task.campo6,
  };
}

function fromPersistence(row) {
  return {
    id: row.id,
    campo1: row.title,
    campo2: row.content,
    campo3: row.author,
    campo4: row.priority,
    campo5: Number(row.rate),
    campo6: row.complete,
  };
}

module.exports = {
  assertTaskShape,
  toPersistence,
  fromPersistence,
};
