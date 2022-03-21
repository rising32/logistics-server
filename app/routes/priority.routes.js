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

  //======================================================= Agenda =============================================================
  // Add a new priority Agenda
  app.post("/priority/agenda/create", priority.createAgenda);

  // Get user's priority Agenda by pa_id
  app.post("/priority/agenda/get_by_wpid", priority.getAgendaByWpId);

  // Get user's priority by week
  // app.post("/priority/agenda/get/week", priority.getAgendaByWeek);

  // Update a priority with id
  app.post("/priority/agenda/update", priority.updateByPriorityAgenda);

};