module.exports = app => {
    const project = require("../controllers/project.controller.js");
  
    // Create a new Project  
    app.post("/project/create", project.create);

    // Update a Project with id
    app.post("/project/update", project.updateByProject);

    //Get My Project
    app.post("/project/get_user_projects", project.getUserProjects);

    //Regist Project Manager
    app.post("/project/regist_manager", project.registManager);

  //==================================================== Task =================================================================
  
  // Create a new Task  
  app.post("/project/task/create", project.createTask);

  // Update Task  
  app.post("/project/task/update", project.updateByTask);

  //Get Project's tasks
  app.post("/project/task/get_project_tasks", project.getProjectTasks);

  //Get User's tasks
  app.post("/project/task/get_user_tasks", project.getUserTasks);

  // Create a new Task Proceed 
  app.post("/project/task/create_precede", project.createTaskPrecede);

  //Get Task Proceed 
  app.post("/project/task/get_precedes", project.getTaskPrecedes);

  // Update Task Proceed
  app.post("/project/task/update_precede", project.updateByPrecede);



  };