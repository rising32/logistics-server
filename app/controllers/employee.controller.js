const Employee = require("../models/employee.model.js");

// Create and Save a new employee
exports.create = (req, res) => {
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

// Update a Employee identified by the id in the request
exports.updateByEmployee = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
    const employee = new Employee(req.body);
    Employee.updateByEmployee(
        employee,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found employee with id ${employee.client_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating employee with id " + employee.client_id
            });
          }
        } else res.send(data);
      }
    );
  };

// Regist My employee
exports.registMyEmployee = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Regist my Employee
    const employee = new Employee({
      client_id: req.body.client_id,
      is_active: req.body.is_active || false
    });
  
    // Save Employee in the database
    Employee.registMyEmployee(req.body.employee_id, employee, (err, data) => {
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

// Get My clients
exports.getMyEmployees = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }    
  
    // Save Employee in the database
    Employee.getMyEmployees(req.body.employee_id, (err, data) => {
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