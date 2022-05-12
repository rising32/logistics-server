module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
    const company = require("../controllers/company.controller.js");
  
//==================================================== Client =================================================================
    // Create a new Client  
    app.post("/admin/create_client", admin.createClient);

    // Update a Client with id
    app.post("/admin/update_client", admin.updateByClient);

    // Regist my Client
    app.post("/admin/regist_my_client", admin.registMyClient);

    // Get my Client
    app.post("/admin/get_my_clients", admin.getMyClients);

    // Get company Client
    app.post("/admin/get_company_clients", admin.getCompanyClients);

//==================================================== Company =================================================================
    // Create a new Company  
    app.post("/user/create_company", company.createCompany);

    // Update Company  
    app.post("/user/update_company", company.updateCompany); 

    // Create a new User-Company  
    app.post("/user/relate_user_company", company.createUserCompanyRelation);

    // Update User-Company Relation  
    app.post("/user/update_user_company", company.updateUserCompanyRelation);

    // Get my Companies
    app.post("/user/get_my_company", company.getMyCompany);  

    // Get my Company profile
    app.post("/user/get_my_company/profile", company.getMyCompanyProfile);

     // Add a new Company member
    app.post("/company/add_member", company.addCompanyMember);

    // Update a Company member type with id
    app.post("/company/update_by_member", company.updateByMember);

    // Get user's Company member
    app.post("/company/get_company_members", company.getCompanyMembers);

    // Get user's Company Member
    app.post("/company/get_member", company.getCompanyMember);

//==================================================== Work Settings =================================================================
    // Create a new Work Settings  
    app.post("/user/create_work_setting", admin.createWorkSetting);

    // Create a Work Settings by array
    app.post("/user/create_work_setting/by_array", admin.createWorkSettingByArray);

    // Get Work Settings  
    app.post("/user/get_work_setting", admin.getWorkSettingByUserId);

    // Update Work Settings  
    app.post("/user/update_work_setting", admin.updateByWorkSetting);


//==================================================== Account setting =================================================================
    // Create a new Account setting
    app.post("/user/create_account_setting", admin.createAccountSetting);

    // Update Account setting
    app.post("/user/update_account_setting", admin.updateByAccountSetting);

    // Get Account setting
    app.post("/user/get_account_setting", admin.getAccountSettingByUserId);   
    
  
  
  
  
  
  
  
  
  };