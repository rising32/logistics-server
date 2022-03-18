module.exports = app => {
    const project = require("../controllers/project.controller.js");
  
    // Create a new team  
    app.post("/project/create", project.create);

    //Get My Project
    app.post("/project/get_user_projects", project.getUserProjects);

    //Regist Project Manager
    app.post("/project/regist_manager", project.registManager);
  };