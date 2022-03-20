module.exports = app => {
  const user = require("../controllers/user.controller.js");

  //var router = require("express");

  // Create a new User  
  app.post("/user/signUp", user.signup);

  //app.get('/user/verify-email', user.verifyemail);

  // Retrieve a single User with id
  app.get("/user/id", user.findOne);

  // Retrieve all Users
  app.get("/user/all", user.findAll);

  // Update a User with id
  app.post("/user/update", user.updateByUser);

  // Delete a User with id
  app.delete("/user/:id", user.delete);

  // Delete all Users
  app.delete("/user/all", user.deleteAll);

  //app.use('/api/Users', app);
  // User Log out
  app.post("/user/logout", user.userLogout);
  // User Login
  app.post("/user/login", user.userLogin);  

  // User Login by token
  app.post("/user/login/token", user.userLoginByToken); 

  // find User
  app.post("/user/findByEmail", user.findUserByEmail);
  // find Online User
  app.post("/user/findOnlineUser", user.findOnlineUserByEmail);
};
