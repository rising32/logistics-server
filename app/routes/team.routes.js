module.exports = app => {
    const user = require("../controllers/team.controller.js");
  
    //var router = require("express");
  
    // Create a new User  
    app.post("/team/signUp", user.signup);
  
    // Retrieve a single Tutorial with id
    app.get("/team/:id", user.findOne);
  
    // Update a Tutorial with id
    app.put("/team/:id", user.update);
  
    // Delete a Tutorial with id
    app.delete("/team/:id", user.delete);
  
    // Delete all Tutorials
    app.delete("/team/all", user.deleteAll);
  
    //app.use('/api/tutorials', app);
    // User Log out
    app.post("/team/logout", user.userLogout);
    // User Login
    app.post("/team/login", user.userLogin);  
  
    // find User
    app.post("/team/findByEmail", user.findUserByEmail);
    // find Online User
    app.post("/team/findOnlineUser", user.findOnlineUserByEmail);
  };