const sql = require("./db.js");

const TeamMember = function(teamMember) {  
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

module.exports = TeamMember;
