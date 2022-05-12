const SqlString = require("mysql/lib/protocol/SqlString");
const sql = require("./db.js");

const Company = function(company) {
  this.cm_id = company.cm_id;
  this.company_id = company.company_id;
  this.member_id = company.member_id;
  this.company_name = company.company_name;
  this.role_id = company.role_id;
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
    sql.query("INSERT INTO tbl_company_member SET member_id=?, company_id=? ,role_id=?", 
      [company.member_id, company.company_id, company.role_id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }  
      company.cm_id = res.insertId;
      console.log("created new User-Company Relation: ", { ...company});
      result(null, {...company });
    });
  };

// Update a User - Company Relation
Company.updateUserCompanyRelation = (company, result) => {
  sql.query(
    "UPDATE tbl_company_member SET member_id=?, company_id = ?, role_id = ? WHERE cm_id = ?",
    [company.member_id, company.company_id, company.role_id, company.cm_id],
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

Company.getMyCompany = (member_id, result) => {    
  sql.query(
      "select c.*, cm.member_id, cm.role_id from mst_company c, (SELECT * FROM tbl_company_member WHERE member_id = ?) cm where c.company_id = cm.company_id", 
      member_id, (err, res) => 
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

Company.getMyCompanyProfile = (company_id, owner_id, member_id, result) => {   
  var q = ""; var param = []; 
  if(owner_id == member_id)
  {
    q =  "SELECT u.*, uc.company_id, c.company_name, ase.currency, ase.time_format, tm.member_count, cli.client_count, p.project_count, task.task_count FROM (SELECT * FROM tbl_user WHERE user_id = ?) u, (SELECT * from tbl_company_member WHERE member_id = ?) uc, mst_company c, tbl_account_setting ase, (SELECT COUNT(member_id) member_count FROM tbl_company_member WHERE company_id = ? GROUP BY company_id) tm, (SELECT COUNT(client_id) client_count FROM `tbl_user_client` WHERE user_id = ? GROUP BY user_id) cli, (SELECT COUNT(project_id) project_count FROM tbl_project WHERE company_id = ? GROUP by company_id) p, (SELECT COUNT(task_id) task_count FROM tbl_priority_task WHERE company_id = ? GROUP by company_id) task WHERE c.company_id = uc.company_id AND ase.user_id = ?";
    param = [owner_id, member_id, company_id, owner_id, company_id,company_id, owner_id];
  }  
  else
  {
    q = "SELECT a.*, p.* FROM (SELECT u.*, uc.company_id, c.company_name, ase.currency, ase.time_format, tm.member_count, cli.client_count FROM (SELECT * FROM tbl_user WHERE user_id = ?) u, (SELECT * from tbl_company_member WHERE member_id = ?) uc, mst_company c, tbl_account_setting ase, (SELECT COUNT(member_id) member_count FROM tbl_company_member WHERE company_id = ? GROUP BY company_id) tm, (SELECT COUNT(client_id) client_count FROM `tbl_user_client` WHERE user_id = ? GROUP BY user_id) cli WHERE c.company_id = uc.company_id AND ase.user_id = ?) a LEFT JOIN (SELECT p.*, task.* FROM (SELECT COUNT(project_id) project_count FROM tbl_project_member WHERE user_id = ? GROUP by user_id) p, (SELECT COUNT(task_id) task_count from tbl_task_assign WHERE member_id = ? GROUP BY member_id) task) p ON 1";
    param = [owner_id, member_id, company_id, owner_id, owner_id, member_id,member_id];
  }
  
    var c = sql.query(q, param, (err, res) => 
      {
          if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
          } 
          result(null, {company:res });
      });
  };

  //Add new Company Member
Company.addCompanyMember = (cm, result) => {
  sql.query("INSERT INTO tbl_company_member SET company_id=?, member_id=?, role_id=?", [cm.company_id, cm.member_id, cm.role_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    cm.cm_id = res.insertId;
    console.log("created new Company: ", cm);
    result(null, cm);
  });
};

//Get All Company Members
Company.getCompanyMembers = (member_id, result) => {
  sql.query("select o.member_id, u.* from tbl_user u, (SELECT cm2.* FROM `tbl_company_member` cm1, tbl_company_member cm2 WHERE cm1.member_id = ? AND cm1.company_id = cm2.company_id) o where u.user_id = o.member_id", 
    member_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Company: ", {member_id:member_id, member:res});
    result(null, {member_id:member_id, member:res});
  });
};

//Get Company's Member
Company.getCompanyMember = (member_id, result) => {
  sql.query("select o.member_id, o.company_id, u.* from tbl_user u, (SELECT * FROM `tbl_company_member` WHERE member_id = ?) o where u.user_id = o.member_id", 
  member_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, {member:res});
  });
};

//Get Company's Boss
Company.getCompanyBoss = (member_id, result) => {
  sql.query("select o.member_id, o.company_id, u.* from tbl_user u, (SELECT c.* from (SELECT company_id FROM `tbl_company_member` WHERE member_id = ?) c1, tbl_company_member c where c1.company_id = c.company_id AND c.role_id = 1) o where u.user_id = o.member_id", 
  member_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, {member:res});
  });
};

Company.updateByMember = (tm, result) => {
  sql.query(
    "UPDATE tbl_company_member SET company_id = ?, member_id = ?, role_id = ? WHERE cm_id = ?", 
      [tm.company_id, tm.member_id, tm.role_id, tm.cm_id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated Company member: ", {...tm});
      result(null, {...tm});
    }
  );
};

module.exports = Company;
