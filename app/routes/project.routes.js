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

  //==================================================== Client Project relation ===============================================
    // Create a new On Project  
    app.post("/project/set_Client", project.setClient);

    //Get Client Projects
    app.post("/project/get_client_projects", project.getClientProjects);//doesn't

    // Update a client Project relation with cp_id
    app.post("/project/update_client_project", project.updateByClientProject);

  //==================================================== Task =================================================================
  
  // Create a new Task  
  app.post("/project/task/create", project.createTask);

  // Update Task  
  app.post("/project/task/update", project.updateByTask);

  //Get Project's tasks
  app.post("/project/task/get_project_tasks", project.getProjectTasks);  

  //Get User's tasks
  app.post("/project/task/get_user_tasks", project.getUserTasks);

  // Create a new Task assign by user_id, task_id 
  app.post("/project/task/assign", project.assignTaskToDeveloper);
  
  //Get tasks by user_id, client_id, project_id, planned_end_date
  app.post("/project/task/get_ucpt", project.getUCPT);

  // Create a new Task Proceed 
  app.post("/project/task/create_precede", project.createTaskPrecede);

  //Get Task Proceed 
  app.post("/project/task/get_precedes", project.getTaskPrecedes);

  // Update Task Proceed
  app.post("/project/task/update_precede", project.updateByPrecede);


  //==================================================== Deliverable =================================================================
  // Create a new Task  
  // app.post("/project/deliverable/create", project.createDeliverable);

  //Get Project's tasks
  // app.post("/project/deliverable/get_by_id", project.getDeliverableById);

  };