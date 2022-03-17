module.exports = app => {
    const project = require("../controllers/project.controller.js");
  
    // Create a new team  
    app.post("/project/create", project.create);
//==================================================== Project Manager =================================================================
    //Regist Project Manager
    app.post("/project/regist_manager", project.registManager);
  };