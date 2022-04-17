const SqlString = require("mysql/lib/protocol/SqlString");
const sql = require("./db.js");

const TeamMember = function(teamMember) {  
  this.tm_id = teamMember.tm_id;
  this.owner_id = teamMember.owner_id;
  this.member_id = teamMember.member_id;
  this.role_id = teamMember.role_id;
};

//Add new Team Member
TeamMember.addTeamMember = (newTeamMember, result) => {
  sql.query("INSERT INTO tbl_team_member SET ?", newTeamMember, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newTeamMember.tm_id = res.insertId;
    console.log("created new Team: ", newTeamMember);
    result(null, newTeamMember);
  });
};

//Get All Team Members
TeamMember.getTeamMembers = (owner_id, result) => {
  sql.query("select o.owner_id, u.* from tbl_user u, (SELECT * FROM `tbl_team_member` WHERE owner_id = ?) o where u.user_id = o.member_id", 
    owner_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Team: ", {owner_id:owner_id, member:res});
    result(null, {owner_id:owner_id, member:res});
  });
};

//Get Team's Member
TeamMember.getTeamMember = (member_id, result) => {
  sql.query("select o.owner_id, u.* from tbl_user u, (SELECT * FROM `tbl_team_member` WHERE member_id = ?) o where u.user_id = o.member_id", 
  member_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, {member:res});
  });
};

TeamMember.updateByMember = (tm, result) => {
  sql.query(
    "UPDATE tbl_team_member SET owner_id = ?, member_id = ?, role_id = ? WHERE tm_id = ?", 
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
      console.log("updated team member: ", {...tm});
      result(null, {...tm});
    }
  );
};

module.exports = TeamMember;
