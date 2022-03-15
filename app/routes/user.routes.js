module.exports = app => {
  const user = require("../controllers/tutorial.controller.js");

  //var router = require("express");

  // Create a new Tutorial  
  app.post("/", user.create);

  // Retrieve all Tutorials
  //app.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  //app.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  app.get("/:id", user.findOne);

  // Update a Tutorial with id
  app.put("/:id", user.update);

  // Delete a Tutorial with id
  app.delete("/:id", user.delete);

  // Delete all Tutorials
  app.delete("/", user.deleteAll);

  //app.use('/api/tutorials', app);
};
