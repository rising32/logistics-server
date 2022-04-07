const Priority = require("../models/priority.model.js");
const PriorityAgenda = require("../models/priority.agenda.model.js");
const util = require("../common/common.util.js");
//Add new Priority
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const newPriority = new Priority(req.body);
  // Save Priority in the database
  Priority.addPriority(newPriority, (err, data) => {
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

//Get All Priority by User Id
exports.getPriorityByUserId = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Priority.getPriorityByUserId(req.body.user_id, (err, data) => {
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

//Get completed Priority by End date
exports.getPriorityByEndDate = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  Priority.getPriorityByEndDate(req.body.user_id, req.body.end_date, (err, data) => {
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

//Get All Priority by User Id, week num
exports.getPriorityByWeek = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  // Save Priority in the database
  Priority.getPriorityByWeek(req.body.user_id, req.body.week, (err, data) => {
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

//Get All Priority by User Id, week num
exports.getPriorityByBeforeWeek = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  // Save Priority in the database
  Priority.getPriorityByBeforeWeek(req.body.user_id, req.body.week, (err, data) => {
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

//Get All Priority by User Id, week num
exports.getNCPriorityByBeforeWeek = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  // Save Priority in the database
  Priority.getNCPriorityByBeforeWeek(req.body.user_id, req.body.week, (err, data) => {
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
exports.updateByPriority = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const priority = new Priority(req.body);
  Priority.updateByPriority(priority, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found priority with id ${priority.wp_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating priority with id " + priority.wp_id
          });
        }
      } else res.send(data);
    }
  );
};

//========================================================== Agenda ===============================================================
//Add new Priority Agenda
exports.createAgenda = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const newPA = new PriorityAgenda(req.body);
  // Save Priority in the database
  PriorityAgenda.addPriorityAgenda(newPA, (err, data) => {
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

//Get Priority Agenda by pa_id
exports.getAgendaByWpId = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  // Save Priority in the database
  PriorityAgenda.getAgendaByWpId(req.body.wp_id, (err, data) => {
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

//Get All Priority by User Id, week num
exports.getAgendaByWeek = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  // Save Priority in the database
  PriorityAgenda.getAgendaByWeek(req.body.user_id, req.body.week, (err, data) => {
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
exports.updateByPriorityAgenda = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const priorityAgenda = new PriorityAgenda(req.body);
  PriorityAgenda.updateByPriorityAgenda(priorityAgenda, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found priorityAgenda with id ${priorityAgenda.pa_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating priorityAgenda with id " + priorityAgenda.pa_id
          });
        }
      } else res.send(data);
    }
  );
};

//========================================================== File ===============================================================
//Add new Priority
exports.createPriorityFile = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Save Priority in the database
  Priority.createPriorityFile(req.body.priority_id, req.body.file_name, (err, data) => {
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