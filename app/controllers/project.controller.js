const Project = require("../models/project.model.js");
const ProjectManager = require("../models/projectManager.model.js");

// Create and Save a new Project
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const project = new Project({
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


//============================================================ Project Manager ================================================================
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
