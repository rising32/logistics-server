module.exports = app => {
  const priority = require("../controllers/priority.controller.js");

  // Add a new priority
  app.post("/priority/create", priority.create);

  // Get user's priority
  app.post("/priority/get/userid", priority.getPriorityByUserId);

  // Get user's priority by week
  app.post("/priority/get/userid/week", priority.getPriorityByWeek);

  // Update a priority with id
  app.post("/priority/update", priority.updateByPriority);
};