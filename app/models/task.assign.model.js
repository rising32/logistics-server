const sql = require("./db.js");

const TaskAssign = function(taskAssign) {  
  this.assign_id = taskAssign.assign_id;
  this.task_id = taskAssign.task_id;
  this.developer_id = taskAssign.developer_id;
  this.role_id = taskAssign.role_id;
};

//Add new Team Member
TaskAssign.assignTaskToDeveloper = (newTaskAssign, result) => {
  sql.query("INSERT INTO tbl_task_assign SET ?", newTaskAssign, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newTaskAssign.assign_id = res.insertId;
    console.log("assigned new Task to user: ", newTaskAssign);
    result(null, newTaskAssign);
  });
};

//Get All Team Members
TaskAssign.getUCPT = (user_id,client_id,project_id,planned_end_date, result) => {
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

module.exports = TaskAssign;
