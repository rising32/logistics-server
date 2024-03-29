const Project = require("../models/project.model.js");
const ProjectMember = require("../models/projectmember.model.js");
const Task = require("../models/task.model.js");
const TaskAssign = require("../models/task.assign.model.js");
const Precede = require("../models/precede.model.js");
const ClientProject = require("../models/client.project.model.js");
const Deliverable = require("../models/deliverable.model.js");

// Create and Save a new Project
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const project = new Project(req.body);
  // Save Project in the database
  Project.insertNewProject(project, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    else {
      const pm = new ProjectMember({
        project_id : project.project_id,
        user_id : project.creator_id,
        is_manager : 1
      });
      ProjectMember.insertNewProjectMember(pm, (err, dat) => {});
      res.send(data);     
    }
  });
};

//Get All User Projects
exports.getUserProjects = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  // Save Company member in the database
  Project.getUserProjects(req.body.creator_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    else {
      res.send(data);      
    }
  });
};

//Get All Company Projects
exports.getCompanyProjects = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  // Save Company member in the database
  Project.getCompanyProjects(req.body.company_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    else {
      res.send(data);      
    }
  });
};

//Get Client Projects and not assigned to client
exports.getClientProjectsNoAssign = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  // Save Company member in the database
  Project.getClientProjectsNoAssign(req.body.company_id, req.body.client_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    else {
      res.send(data);      
    }
  });
};

// Update a Project identified by the id in the request
exports.updateByProject = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const project = new Project(req.body);
  Project.updateByProject(project, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found project with id ${project.project_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating project with id " + project.project_id
          });
        }
      } else res.send(data);
    }
  );
};

// Create and Save a new Project Manager
exports.registManager = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Project Manager
  const pm = new ProjectMember({
    project_id : req.body.project_id,
    user_id : req.body.user_id,
    is_manager : req.body.is_manager
  });

  // Save Project Manager in the database
  ProjectMember.insertNewProjectMember(pm, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    else {
      res.send(data);      
    }
  });
};

//==================================================== Project Type =========================================================

// Create and Save a new Project Type
exports.createType = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Save Project Type in the database
  Project.createType(req.body.project_type, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    else {
      res.send(data);      
    }
  });
};

// Update a Project Type
exports.updateByType = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Project.updateByType(req.body.pt_id, req.body.project_type, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found project type with id ${pt_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating project type with id " + pt_id
          });
        }
      } else res.send(data);
    }
  );
};

//Get All Project Types
exports.getProjectTypes = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Project.getProjectTypes((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    else {
      res.send(data);      
    }
  });
};

//==================================================== Client ===============================================================
// Create and Save a new Client-Project relation
exports.setClient = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Save Project in the database
  const cp = new ClientProject(req.body);
  ClientProject.insertNewClientProject(cp, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Client-Project relation."
      });
    else {
      res.send(data);      
    }
  });
};

// Update a CP relation identified by the id in the request
exports.updateByClientProject = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const cp = new ClientProject(req.body);
  ClientProject.updateByClientProject(cp, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found cp with id ${cp.cp_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating cp with id " + cp.cp_id
          });
        }
      } else res.send(data);
    }
  );
};

//Get All User Projects
exports.getClientProjects = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  // Save Company member in the database
  ClientProject.getClientProjects(req.body.client_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    else {
      res.send(data);      
    }
  });
};

//Get All User Projects
exports.getClientProjectByCid_Pid = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  // Save Company member in the database
  ClientProject.getClientProjectByCid_Pid(req.body.client_id, req.body.project_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    else {
      res.send(data);      
    }
  });
};

//==================================================== Task =================================================================
exports.createTask = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const task = new Task(req.body);
  // Save new Task in the database
  Task.insertNewTask(task, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    else {
      res.send(data);      
    }
  });
};

//Get All User Projects
exports.getProjectTasks = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Task.getProjectTasks(req.body.project_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the Project's tasks."
      });
    else {
      res.send(data);      
    }
  });
};

//assign Task to Developer
exports.assignTaskToDeveloper = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const taskAssign = new TaskAssign(req.body);
  // Save new Task assign in the database
  TaskAssign.assignTaskToDeveloper(taskAssign, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    else {
      //Insert when this member belong to project
      ProjectMember.checkIfMemberExistInProject(taskAssign.task_id, taskAssign.member_id, (err, da) => {
        if (!err)     
          if(da.res[0].user_id == null)
          {
            const pm = new ProjectMember({
              project_id : da.res[0].project_id,
              task_id : taskAssign.task_id,
              user_id : taskAssign.member_id,
              is_manager : 0
            });
            ProjectMember.insertNewProjectMember(pm, (err, dat) => {});            
          }
      });
      res.send(data);
    }
  });
};

//Get tasks by user_id, client_id, project_id, planned_end_date
exports.getUCPT = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  TaskAssign.getUCPT(req.body.user_id,req.body.member_id,req.body.client_id,req.body.project_id,req.body.planned_end_date, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the Project's tasks."
      });
    else {
      res.send(data);      
    }
  });
};

//Get tasks by user_id, client_id, project_id, planned_end_date
exports.setUCPT = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  var ucpt = {
    client_id:req.body.client_id,
    project_id:req.body.project_id,
    task_id : req.body.task_id,
    task_name:req.body.task_name,
    member_id:req.body.member_id,
    planned_end_date:req.body.planned_end_date,
    cp_id : req.body.cp_id || null
  };
 
  if(ucpt.client_id != null)
  {
    if(ucpt.project_id != null)
    {
      //if there is no client_project relation, insert new one.
      ClientProject.getClientProjectByCid_Pid(ucpt.client_id, ucpt.project_id, (err, data) => {
        if (!err && data.project.length == 0)
        {          
          const cp = new ClientProject(req.body);
          ClientProject.insertNewClientProject(cp, (err, dataCP) => {
            if (!err)
            ucpt.cp_id = dataCP[0].cp_id;
          });
        }        
      });

      //if there is no project - task relation, insert new one.      
      Task.getProjectTasks(req.body.project_id, (err, data) => {
        if (!err)
        {
          var b_exist_projectid = false;
          var b_exist_taskid = false;
          //res.send(data); 
          if(data.task.length > 0)     
          {
            for(var i = 0; i < data.task.length; i++)
              if(data.task[i].task_id == ucpt.task_id) 
              {
                b_exist_taskid = true;
                if(data.task[i].project_id == ucpt.project_id) 
                {
                  b_exist_projectid = true;
                  break;                
                }
              }              
          }
          //if not exist current task_id 
          if(!b_exist_taskid)
          {            
            const task = new Task(req.body);
            Task.insertNewTask(task, (err, data) => {
              if (!err)
              {
                ucpt.task_id = data.task.task_id;
              }
            });            
          }
          else if(!b_exist_projectid)
          {
            console.log("At first, you must link task with project.");
          }
        }
      });      
    }
  }
  else
  {

  }  
  res.send(ucpt);
};

// Get User's all tasks
exports.getUserTasks = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  } 
  Task.getUserTasks(req.body.creator_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the User's tasks."
      });
    else {
      res.send(data);      
    }
  });
};

// Get Company's all tasks
exports.getCompanyTasks = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  } 
  Task.getCompanyTasks(req.body.company_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the User's tasks."
      });
    else {
      res.send(data);      
    }
  });
};

// Get User's all tasks by week
exports.getCompanyTasksByWeek = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  } 
  Task.getCompanyTasksByWeek(req.body.company_id, req.body.week, req.body.year, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the User's tasks."
      });
    else {
      res.send(data);      
    }
  });
};

//Get User's tasks linked with project or not linked with any one
exports.getCompanyTasksByPNA = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  } 
  Task.getCompanyTasksByPNA(req.body.company_id,req.body.project_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the User's tasks."
      });
    else {
      res.send(data);      
    }
  });
};

// Update a Project identified by the id in the request
exports.updateByTask = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const task = new Task(req.body);
  Task.updateByTask(task, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found task with id ${task.task_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating task with id " + task.task_id
          });
        }
      } else res.send(data);
    }
  );
};

//==================================================== Task Precede =================================================================
exports.createTaskPrecede = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const precede = new Precede({
    precede_id:req.body.precede_id,
    task_id: req.body.task_id,
    preceding:req.body.preceding
  });

  // Save new Task in the database
  Precede.insertNewPrecede(precede, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    else {
      res.send(data);      
    }
  });
};

//Get task's all precedes
exports.getTaskPrecedes = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Precede.getTaskPrecedes(req.body.task_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the Project's tasks."
      });
    else {
      res.send(data);      
    }
  });
};

// Update a task precede
exports.updateByPrecede = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const precede = new Precede(req.body);
  Precede.updateByPrecede(precede, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found precede with id ${precede.precede_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating task with id " + precede.precede_id
          });
        }
      } else res.send(data);
    }
  );
};

//==================================================== Deliverable =================================================================
exports.createDeliverable = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const deliverable = new Deliverable(req.body);
  // Save new Deliverable in the database
  Deliverable.addDeliverable(deliverable, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    else {
      res.send(data);      
    }
  });
};

//Get Deliverable by Id
exports.getDeliverableById = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Deliverable.getDeliverableById(req.body.deliverable_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the Deliverable."
      });
    else {
      res.send(data);      
    }
  });
};

//Get completed Deliverable by End date
exports.getDeliverableByPlannedEndDate = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  Deliverable.getDeliverableByPlannedEndDate(req.body.user_id, req.body.planned_end_date, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    else {
      res.send(data);      
    }
  });
};

//Get completed Deliverable by End date
exports.getDeliverableByEndDate = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  Deliverable.getDeliverableByEndDate(req.body.user_id, req.body.end_date, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    else {
      res.send(data);      
    }
  });
};

// Get Client, Project, task by end deliverable
exports.getCPTbyDeliverable = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  Deliverable.getCPTbyDeliverable(req.body.deliverable_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    else {
      res.send(data);      
    }
  });
};

// Update a task Deliverable
exports.updateByDeliverable = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const d = new Deliverable(req.body);
  Deliverable.updateByDeliverable(d, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Deliverable with id ${d.deliverable_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating task with id " + d.deliverable_id
          });
        }
      } else res.send(data);
    }
  );
};

//==================================================== Statistics =================================================================
// Get real Work day list per client, week
exports.getWorkDaysPerWeek_Client = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }    

  // Get real Work day list per client, week
  Project.getWorkDaysPerWeek_Client(req.body.user_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the WorkSetting."
      });
    else {
      res.send(data);      
    }
  });
};

// Get real Work day list per client monthly
exports.getWorkDaysPerMonth_Client = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }    

  // Get real Work day list per client monthly
  Project.getWorkDaysPerMonth_Client(req.body.user_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the WorkSetting."
      });
    else {
      res.send(data);      
    }
  });
};

// Get real Work day list per project, week
exports.getWorkDaysPerWeek = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }    

  // Get real Work day list per project, week
  Project.getWorkDaysPerWeek(req.body.user_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the WorkSetting."
      });
    else {
      res.send(data);      
    }
  });
};

// Get real Work day list per project monthly
exports.getWorkDaysPerMonth = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }    

  // Get real Work day list per project monthly
  Project.getWorkDaysPerMonth(req.body.user_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the WorkSetting."
      });
    else {
      res.send(data);      
    }
  });
};

// Get real Work day list per client, week
exports.getWorkDaysPerWeek_Member = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }    

  // Get real Work day list per client, week
  Project.getWorkDaysPerWeek_Member(req.body.creator_id, req.body.member_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the WorkSetting."
      });
    else {
      res.send(data);      
    }
  });
};

// Get real Work day list per client monthly
exports.getWorkDaysPerMonth_Member = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }    

  // Get real Work day list per client monthly
  Project.getWorkDaysPerMonth_Member(req.body.creator_id, req.body.member_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the WorkSetting."
      });
    else {
      res.send(data);      
    }
  });
};