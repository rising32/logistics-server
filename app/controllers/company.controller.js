const CompanyMember = require("../models/company.member.model.js");

//Add new Company Member
exports.addCompanyMember = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const newCompanyMember = new CompanyMember(req.body);
  // Save Company member in the database
  CompanyMember.addCompanyMember(newCompanyMember, (err, data) => {
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

//Get All Company Members
exports.getCompanyMembers = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  // Save Company member in the database
  CompanyMember.getCompanyMembers(req.body.owner_id, (err, data) => {
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

//Get Company Member
exports.getCompanyMember = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  CompanyMember.getCompanyMember(req.body.member_id, (err, data) => {
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

// Update a Company member
exports.updateByMember = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const tm = new CompanyMember(req.body);
  CompanyMember.updateByMember(tm, (err, data) => {
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
