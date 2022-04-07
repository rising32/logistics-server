module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
  
//==================================================== Client =================================================================
    // Create a new Client  
    app.post("/admin/create_client", admin.createClient);

    // Update a Client with id
    app.post("/admin/update_client", admin.updateByClient);

    // Regist my Client
    app.post("/admin/regist_my_client", admin.registMyClient);

    // Get my Client
    app.post("/admin/get_my_clients", admin.getMyClients);

//==================================================== Company =================================================================
    // Create a new Company  
    app.post("/user/create_company", admin.createCompany);

    // Update Company  
    app.post("/user/update_company", admin.updateCompany); 

    // Create a new User-Company  
    app.post("/user/relate_user_company", admin.createUserCompanyRelation);

    // Update User-Company Relation  
    app.post("/user/update_user_company", admin.updateUserCompanyRelation);

    // Get my Companies
    app.post("/user/get_my_company", admin.getMyCompany);  
  

//==================================================== Work Settings =================================================================
    // Create a new Work Settings  
    app.post("/user/create_work_setting", admin.createWorkSetting);

    // Create a Work Settings by array
    app.post("/user/create_work_setting/by_array", admin.createWorkSettingByArray);

    // Get Work Settings  
    app.post("/user/get_work_setting", admin.getWorkSettingByUserId);

    // Update Work Settings  
    app.post("/user/update_work_setting", admin.updateByWorkSetting);


//==================================================== Date, Time, Currency =================================================================
    // Create a new Date,Time,Currency  
    app.post("/user/create_date_time_currency", admin.createDateTimeCurrency);

    // Update Date, Time, Currency 
    app.post("/user/update_date_time_currency", admin.updateByDateTimeCurrency);

    // Get Date, Time, Currency  
    app.post("/user/get_date_time_currency", admin.getDTCByUserId);   
    
  
  
  
  
  
  
  
  
  };