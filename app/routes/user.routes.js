module.exports = app => {
  const user = require("../controllers/user.controller.js");

  //var router = require("express");

  // Create a new User  
  app.post("/user/signUp", user.signup);

  // Retrieve all Tutorials
  //app.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  //app.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  app.get("/user/:id", user.findOne);

  // Update a Tutorial with id
  app.put("/user/:id", user.update);

  // Delete a Tutorial with id
  app.delete("/user/:id", user.delete);

  // Delete all Tutorials
  app.delete("/user/all", user.deleteAll);

  //app.use('/api/tutorials', app);
  // User Log out
  app.post("/user/logout", user.userLogout);
  // User Login
  app.post("/user/login", user.userLogin);  

  // find User
  app.post("/user/findByEmail", user.findUserByEmail);
  // find Online User
  app.post("/user/findOnlineUser", user.findOnlineUserByEmail);
};
