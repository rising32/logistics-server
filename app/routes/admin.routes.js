module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
  
//==================================================== Client =================================================================
    // Create a new Client  
    app.post("/admin/create_client", admin.createClient);

    // Update a Client with id
    app.post("/admin/update_client", admin.updateByClient);

    // Regist my Client
    app.post("/admin/regist_my_client", admin.registMyClient);

    // Regist my Client
    app.post("/admin/get_my_clients", admin.getMyClients);

//==================================================== Employee =================================================================
    // Create a new employee  
    app.post("/admin/create_employee", admin.createEmployee);  

//==================================================== Company =================================================================
    // Create a new Company  
    app.post("/admin/create_company", admin.createCompany);    
  

//==================================================== Work Settings =================================================================
    // Create a new Work Settings  
    app.post("/admin/create_work_setting", admin.createWorkSetting);

//==================================================== Date, Time, Currency =================================================================
    // Create a new DateTimeCurrency  
    app.post("/admin/create_date_time_currency", admin.createDateTimeCurrency);   
  
  
  
  
  
  
  
  
  };