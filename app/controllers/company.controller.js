const Company = require("../models/company.model.js");
const User = require("../models/user.model.js");
//Add new Company Member
exports.addCompanyMember = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const newCompanyMember = new Company(req.body);
  // Save Company member in the database
  Company.addCompanyMember(newCompanyMember, (err, data) => {
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
  Company.getCompanyMembers(req.body.user_id, (err, data) => {
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
  Company.getCompanyMember(req.body.member_id, (err, data) => {
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
  const tm = new Company(req.body);
  Company.updateByMember(tm, (err, data) => {
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

//============================================================ Company Member ================================================================
  // Create and Save a new Company
  exports.createCompany = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Save company in the database
    Company.insertNewCompany(req.body.company_name, (err, data) => {
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

  // Update a Company
exports.updateCompany = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const company = new Company(req.body);
  Company.updateCompany(
    company,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Company with id ${company.company_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Company with id " + company.company_id
          });
        }
      } else res.send(data);
    }
  );
};

// Create new User-Company Relation
exports.createUserCompanyRelation = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Save company in the database
  const company = new Company(req.body);
  Company.insertNewUserCompanyRelation(company, (err, data) => {
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

// Update a User-Company Relation
exports.updateUserCompanyRelation = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  const company = new Company(req.body);
  Company.updateUserCompanyRelation(
    company,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Company with id ${company.company_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Company with id " + company.company_id
          });
        }
      } else res.send(data);
    }
  );
};

// Get My Company
exports.getMyCompany = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }    

  // Save Client in the database
  Company.getMyCompany(req.body.user_id, (err, data) => {
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

// Get My Company Profile
exports.getMyCompanyProfile = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  
  Company.getCompanyBoss(req.body.user_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the Company info."
      });
    else {      
      var company_id = data.member[0].company_id;
      var owner_id = data.member[0].member_id;
      
      Company.getMyCompanyProfile(company_id, owner_id, req.body.user_id, (err, company) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while getting the Company info."
          });
        else {
          if(company.company.length > 0)
          {
            var dat = company.company[0];
            res.send({company:{
              admin_info:new User(dat), 
              company_id: dat.company_id, 
              company_name: dat.company_name, 
              currency: dat.currency, 
              time_format: dat.time_format, 
              member_count: dat.member_count,
              client_count: dat.client_count,
              project_count: dat.project_count,
              task_count: dat.task_count
            }});
          }
          else          
            res.send({company:{}});
        }
      });      
    }
  });
};
