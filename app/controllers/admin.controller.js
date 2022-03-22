const Client = require("../models/client.model.js");
const Company = require("../models/company.model.js");
const WorkSetting = require("../models/worksetting.model.js");
const DTC = require("../models/dtc.model.js");

// Create and Save a new User
exports.createClient = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Client
  const client = new Client({
    client_name: req.body.client_name,
    is_active: req.body.is_active || true
  });

  // Save Client in the database
  Client.insertNewClient(client, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Client."
      });
    else {
      res.send(data);      
    }
  });
};

// Update a Client identified by the id in the request
exports.updateByClient = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
    const client = new Client(req.body);
    Client.updateByClient(
        client,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found client with id ${client.client_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating client with id " + client.client_id
            });
          }
        } else res.send(data);
      }
    );
  };

// Regist My client
exports.registMyClient = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Regist my Client
    const client = new Client({
      user_id: req.body.user_id,
      client_id: req.body.client_id,
      is_active: req.body.is_active || false
    });
  
    // Save Client in the database
    Client.registMyClient(client, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Client."
        });
      else {
        res.send(data);      
      }
    });
  };

// Get My clients
exports.getMyClients = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }    
  
    // Save Client in the database
    Client.getMyClients(req.body.user_id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Client."
        });
      else {
        res.send(data);      
      }
    });
  };

//============================================================ Company ================================================================
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
//============================================================ Work Setting ================================================================
// Create and Save a new WorkSetting
exports.createWorkSetting = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a WorkSetting
  const workSetting = new WorkSetting({
    user_id : req.body.user_id,
    first_day_of_week : req.body.first_day_of_week,
    work_on_week : req.body.work_on_week,
    start_work_time : req.body.start_work_time,
    end_work_time : req.body.end_work_time,
    remainder : req.body.remainder
  });

  // Save WorkSetting in the database
  WorkSetting.insertNewWorkSetting(workSetting, (err, data) => {
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

// Get My Work Settings
exports.getWorkSettingByUserId = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }    

  // Save WorkSetting in the database
  WorkSetting.getWorkSettingByUserId(req.body.user_id, (err, data) => {
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

// Get My Work Settings
exports.getWorkDaysPerWeek = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }    

  // Save WorkSetting in the database
  WorkSetting.getWorkDaysPerWeek(req.body.client_id, req.body.user_id, (err, data) => {
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
  // Update a WorkSetting
exports.updateByWorkSetting = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const ws = new WorkSetting(req.body);
  WorkSetting.updateByWorkSetting(
      ws,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found WorkSetting with id ${ws.ws_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating WorkSetting with id " + ws.ws_id
          });
        }
      } else res.send(data);
    }
  );
};

  //============================================================ Date, Time, Currency Setting ================================================================
  // Create and Save a new Date, Time, Currency Setting
  exports.createDateTimeCurrency = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Date, Time, Currency Setting
    const dtc = new DTC({
      user_id : req.body.user_id,
      date_format : req.body.date_format,
      time_format : req.body.time_format,
      currency : req.body.currency,
      decimal_seperator : req.body.decimal_seperator
    });
  
    // Save Date, Time, Currency Setting in the database
    DTC.insertNewDTC(dtc, (err, data) => {
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

// Get My Date, Time, Currency Setting
exports.getDTCByUserId = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }    

  // Save WorkSetting in the database
  DTC.getDTCByUserId(req.body.user_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the DTC."
      });
    else {
      res.send(data);      
    }
  });
};

  // Update Date, Time, Currency Setting
exports.updateByDateTimeCurrency = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const dtc = new DTC(req.body);
  DTC.updateByDTC(
    dtc,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found DTC with id ${dtc.dtc_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating DTC with id " + dtc.dtc_id
          });
        }
      } else res.send(data);
    }
  );
};

  