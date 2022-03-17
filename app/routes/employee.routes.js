module.exports = app => {
    const employee = require("../controllers/employee.controller.js");
  
    // Create a new employee  
    app.post("/employee/create", employee.create);   
  };