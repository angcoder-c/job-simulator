const { AppError } = require("../../domain/errors/app-error");

function notFoundHandler(_req, res) {
  res.status(404).json({ message: "Route not found" });
}

function errorHandler(error, _req, res, _next) {
  if (error instanceof AppError) {
    const payload = { message: error.message };
    if (error.details) payload.details = error.details;
    return res.status(error.statusCode).json(payload);
  }

  console.error(error);
  return res.status(500).json({ message: "Internal server error" });
}

module.exports = { notFoundHandler, errorHandler };
