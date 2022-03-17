const Client = require("../models/client.model.js");
const Employee = require("../models/employee.model.js");
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
    is_active: req.body.is_active || false
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
      client_id: req.body.client_id,
      is_active: req.body.is_active || false
    });
  
    // Save Client in the database
    Client.registMyClient(req.body.user_id, client, (err, data) => {
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


  //============================================================ Employee ================================================================
  // Create and Save a new employee
exports.createEmployee = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a employee
  const employee = new Employee({
    user_id:req.body.user_id,
    employee_code: req.body.employee_code,
    employee_name: req.body.employee_name
  });

  // Save employee in the database
  Employee.insertNewEmployee(employee, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
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
  
    // Create a company
    const company = new Company({
      company_name: req.body.company_name
    });
  
    // Save company in the database
    Company.insertNewCompany(company, (err, data) => {
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
      company_id : req.body.company_id,
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
      company_id : req.body.company_id,
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

  