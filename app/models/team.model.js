const sql = require("./db.js");

const Team = function(team) {
  this.team_id = team.team_id,
  this.team_name = team.team_name;
};

Team.insertNewTeam = (team_name, result) => {
  sql.query("INSERT INTO mst_team SET team_name =?", team_name, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Team: ", { team_id: res.insertId, team_name:team_name });
    result(null, { team_id: res.insertId, team_name:team_name });
  });
};

Team.addTeamMember = (team_id, employee_id, role_id, result) => {
  sql.query("INSERT INTO tbl_team_member SET team_id=?, employee_id=?, role_id=?", [team_id, employee_id, role_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Team: ", { tm_id:res.insertId, team_id:team_id, employee_id:employee_id, role_id:role_id });
    result(null, { tm_id:res.insertId, team_id:team_id, employee_id:employee_id, role_id:role_id });
  });
};

module.exports = Team;
