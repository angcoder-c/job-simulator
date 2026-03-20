const { Router } = require("express");

function createTaskRouter(taskController) {
  const router = Router();

  router.get("/tasks", taskController.getAll);
  router.get("/tasks/:id", taskController.getOne);
  router.post("/tasks", taskController.create);
  router.put("/tasks/:id", taskController.replace);
  router.patch("/tasks/:id", taskController.patch);
  router.delete("/tasks/:id", taskController.remove);

  // Alias to match the singular path mentioned in the README draft.
  router.delete("/task/:id", taskController.remove);

  return router;
}

module.exports = { createTaskRouter };
