const Priority = require("../models/priority.model.js");

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
  // Save Priority in the database
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
