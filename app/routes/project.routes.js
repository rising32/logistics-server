module.exports = app => {
    const project = require("../controllers/project.controller.js");
  
    // Create a new Project  
    app.post("/project/create", project.create);

    // Update a Project with id
    app.post("/project/update", project.updateByProject);

    //Get My Project
    app.post("/project/get_user_projects", project.getUserProjects);

    //Get My Project linked with this client or not linked with any one
    app.post("/project/get/client_no_assign", project.getClientProjectsNoAssign);

    //Regist Project Manager
    app.post("/project/regist_manager", project.registManager);

  //==================================================== Project Type ==========================================================
    // Create a new Project Type 
    app.post("/project/create_type", project.createType);

    // Update a Project type with id
    app.post("/project/update_type", project.updateByType);

    //Get Project types
    app.get("/project/get_type", project.getProjectTypes);

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

  //Get User's tasks linked with project or not linked with any one
  app.post("/project/task/get_by_pna", project.getUserTasksByPNA);

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
  // Create a new Deliverable  
  app.post("/project/deliverable/create", project.createDeliverable);

  //Get Deliverable
  app.post("/project/deliverable/get_by_id", project.getDeliverableById);

  // Update Deliverable
  app.post("/project/deliverable/update", project.updateByDeliverable);

  // Get user's ended Deliverable by planned end date
  app.post("/project/deliverable/get/planned_end_date", project.getDeliverableByPlannedEndDate);

  // Get user's ended Deliverable by end date
  app.post("/project/deliverable/get/end_date", project.getDeliverableByEndDate);

  // Get Client, Project, task by end deliverable
  app.post("/project/deliverable/get_cpt_by_id", project.getCPTbyDeliverable);

  //==================================================== statistics ===============================================================

  //Get tasks by user_id, client_id, project_id, planned_end_date
  app.post("/project/task/get_ucpt", project.getUCPT);

  // Get real Work day list per client, week
  app.post("/project/get_real_workdays/week/client", project.getWorkDaysPerWeek_Client);

  // Get real Work day list per client monthly
  app.post("/project/get_real_workdays/month/client", project.getWorkDaysPerMonth_Client);

  // Get real Work day list per project, week
  app.post("/project/get_real_workdays/week", project.getWorkDaysPerWeek);

  // Get real Work day list per project monthly
  app.post("/project/get_real_workdays/month", project.getWorkDaysPerMonth);

  // Get real Work day list per member, week
  app.post("/project/get_real_workdays/week/member", project.getWorkDaysPerWeek_Member);

  // Get real Work day list per member monthly
  app.post("/project/get_real_workdays/month/member", project.getWorkDaysPerMonth_Member);

  };