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

    //Get Client Project by client_id, project_id 
    app.post("/project/get_by_cid_pid", project.getClientProjectByCid_Pid);//doesn't

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
  
  //Set tasks by user_id, client_id, project_id, planned_end_date, task, deliverable
  //app.post("/project/task/set_ucpt", project.setUCPT);

  //===================================================== Task Precede =============================================================
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

  //==================================================== statistics ===============================================================

  //Get tasks by user_id, client_id, project_id, planned_end_date
  app.post("/project/task/get_ucpt", project.getUCPT);

  //Get client - project plan dates
  //app.post("/project/get_weekly_status", project.getWeeklyStatus);

  };