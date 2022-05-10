const SqlString = require("mysql/lib/protocol/SqlString");
const sql = require("./db.js");

const CompanyMember = function(companyMember) {  
  this.tm_id = companyMember.tm_id;
  this.owner_id = companyMember.owner_id;
  this.member_id = companyMember.member_id;
  this.role_id = companyMember.role_id;
};

//Add new Company Member
CompanyMember.addCompanyMember = (newCompanyMember, result) => {
  sql.query("INSERT INTO tbl_company_member SET ?", newCompanyMember, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newCompanyMember.tm_id = res.insertId;
    console.log("created new Company: ", newCompanyMember);
    result(null, newCompanyMember);
  });
};

//Get All Company Members
CompanyMember.getCompanyMembers = (owner_id, result) => {
  sql.query("select o.owner_id, u.* from tbl_user u, (SELECT * FROM `tbl_company_member` WHERE owner_id = ?) o where u.user_id = o.member_id", 
    owner_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Company: ", {owner_id:owner_id, member:res});
    result(null, {owner_id:owner_id, member:res});
  });
};

//Get Company's Member
CompanyMember.getCompanyMember = (member_id, result) => {
  sql.query("select o.owner_id, u.* from tbl_user u, (SELECT * FROM `tbl_company_member` WHERE member_id = ?) o where u.user_id = o.member_id", 
  member_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, {member:res});
  });
};

CompanyMember.updateByMember = (tm, result) => {
  sql.query(
    "UPDATE tbl_company_member SET owner_id = ?, member_id = ?, role_id = ? WHERE tm_id = ?", 
      [tm.owner_id, tm.member_id, tm.role_id, tm.tm_id], (err, res) => {
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

module.exports = CompanyMember;
