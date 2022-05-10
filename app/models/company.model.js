const sql = require("./db.js");

const Company = function(company) {
  this.uc_id = company.uc_id;
  this.company_id = company.company_id;
  this.user_id = company.user_id;
  this.company_name = company.company_name;
  this.is_manager = company.is_manager;
};
// Create and Save a new Company
Company.insertNewCompany = (company_name, result) => {
  sql.query("INSERT INTO mst_company SET company_name=?", company_name, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Company: ", { company_id: res.insertId, company_name:company_name });
    result(null, { company_id: res.insertId, company_name:company_name });
  });
};
// Update a Company
Company.updateCompany = (company, result) => {
    sql.query(
      "UPDATE mst_company SET company_name = ? WHERE company_id = ?",
      [company.company_name, company.company_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found company with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated company: ", { ...company });
        result(null, {...company });
      }
    );
  };

//Create new User - Company Relation
Company.insertNewUserCompanyRelation = (company, result) => {
    sql.query("INSERT INTO tbl_user_company SET user_id=?, company_id=? ,is_manager=?", 
      [company.user_id, company.company_id, company.is_manager], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }  
      company.uc_id = res.insertId;
      console.log("created new User-Company Relation: ", { ...company});
      result(null, {...company });
    });
  };

// Update a User - Company Relation
Company.updateUserCompanyRelation = (company, result) => {
  sql.query(
    "UPDATE tbl_user_company SET user_id=?, company_id = ?, is_manager = ? WHERE uc_id = ?",
    [company.user_id, company.company_id, company.is_manager, company.uc_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found company with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated company: ", { ...company });
      result(null, {...company });
    }
  );
};

Company.getMyCompany = (user_id, result) => {    
  sql.query(
      "select c.*, uc.user_id, uc.is_manager from mst_company c, (SELECT * FROM tbl_user_company WHERE user_id = ?) uc where c.company_id = uc.company_id", 
      user_id, (err, res) => 
      {
          if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
          }    
          console.log("created my Client: ", {company:res});
          result(null, {company:res });
      });
  };

Company.getMyCompanyProfile = (owner_id, member_id, result) => {   
  var q = ""; var param = []; 
  if(owner_id == member_id)
  {
    q =  "SELECT u.*, uc.company_id, c.company_name, ase.currency, ase.time_format, tm.member_count, cli.client_count, p.project_count, task.task_count FROM (SELECT * FROM tbl_user WHERE user_id = ?) u, (SELECT * from tbl_user_company WHERE user_id = ?) uc, mst_company c, tbl_account_setting ase, (SELECT COUNT(member_id) member_count FROM tbl_company_member WHERE owner_id = ? GROUP BY owner_id) tm, (SELECT COUNT(client_id) client_count FROM `tbl_user_client` WHERE user_id = ? GROUP BY user_id) cli, (SELECT COUNT(project_id) project_count FROM tbl_project WHERE creator_id = ? GROUP by creator_id) p, (SELECT COUNT(task_id) task_count FROM tbl_priority_task WHERE creator_id = ?) task WHERE c.company_id = uc.company_id AND ase.user_id = ?;";
    param = [owner_id, owner_id, owner_id, owner_id, member_id,member_id, owner_id];
  }  
  else
  {
    q = "SELECT a.*, p.* FROM (SELECT u.*, uc.company_id, c.company_name, ase.currency, ase.time_format, tm.member_count, cli.client_count FROM (SELECT * FROM tbl_user WHERE user_id = ?) u, (SELECT * from tbl_user_company WHERE user_id = ?) uc, mst_company c, tbl_account_setting ase, (SELECT COUNT(member_id) member_count FROM tbl_company_member WHERE owner_id = ? GROUP BY owner_id) tm, (SELECT COUNT(client_id) client_count FROM `tbl_user_client` WHERE user_id = ? GROUP BY user_id) cli WHERE c.company_id = uc.company_id AND ase.user_id = ?) a LEFT JOIN (SELECT p.*, task.* FROM (SELECT COUNT(project_id) project_count FROM tbl_project_member WHERE user_id = ? GROUP by user_id) p, (SELECT COUNT(task_id) task_count from tbl_task_assign WHERE member_id = ? GROUP BY member_id) task) p ON 1;";
    param = [owner_id, owner_id, owner_id, owner_id, owner_id, member_id,member_id];
  }
  
    sql.query(q, param, (err, res) => 
      {
          if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
          } 
          result(null, {company:res });
      });
  };
module.exports = Company;
