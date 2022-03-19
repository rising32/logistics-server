const Project = require("../models/project.model.js");
const ProjectManager = require("../models/projectManager.model.js");
const Task = require("../models/task.model.js");
const Precede = require("../models/precede.model.js");

// Create and Save a new Project
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const project = new Project({
    project_id:req.body.project_id,
    creator_id:req.body.creator_id,
    project_name : req.body.project_name,
    planned_start_date : req.body.planned_start_date,
    planned_end_date : req.body.planned_end_date,
    actual_start_date : req.body.actual_start_date,
    actual_end_date : req.body.actual_end_date,
    description : req.body.description
  });

  // Save Project in the database
  Project.insertNewProject(project, (err, data) => {
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
exports.getUserProjects = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  // Save Team member in the database
  Project.getUserProjects(req.body.creator_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Team."
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
  const pm = new ProjectManager({
    project_id : req.body.project_id,
    user_id : req.body.user_id
  });

  // Save Project Manager in the database
  ProjectManager.insertNewProjectManager(pm, (err, data) => {
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

  const task = new Task({
    task_id:req.body.task_id,
    creator_id: req.body.creator_id,
    project_id:req.body.project_id,
    task_name : req.body.task_name,
    priority : req.body.priority,
    description : req.body.description,
    planned_start_date : req.body.planned_start_date,
    planned_end_date : req.body.planned_end_date,
    actual_start_date : req.body.actual_start_date,
    actual_end_date : req.body.actual_end_date,
    hourly_rate : req.body.hourly_rate,
    is_add_all : req.body.is_add_all,
    is_active : req.body.is_active
  });

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

