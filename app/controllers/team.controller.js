const TeamMember = require("../models/team.model.js");

//Add new Team Member
exports.addTeamMember = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const newTeamMember = new TeamMember(req.body);
  // Save Team member in the database
  TeamMember.addTeamMember(newTeamMember, (err, data) => {
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

//Get All Team Members
exports.getTeamMembers = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  // Save Team member in the database
  TeamMember.getTeamMembers(req.body.owner_id, (err, data) => {
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

// Update a Team member
exports.updateByMember = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const tm = new TeamMember(req.body);
  TeamMember.updateByMember(tm, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found project type with id ${tm.tm_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating project type with id " + tm.tm_id
          });
        }
      } else res.send(data);
    }
  );
};
