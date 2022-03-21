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
TaskAssign.getUCPT = (member_id,client_id,project_id,planned_end_date, result) => {  
  var q = "SELECT a.*, mcp.client_id, mcp.client_name FROM (SELECT a.member_id, p. * from (SELECT * FROM tbl_task_assign WHERE member_id = ?) a, (SELECT * from tbl_priority_task where planned_end_date >= ?) p where a.task_id = p.task_id) a, (SELECT cp.*, m.client_name from tbl_client_project cp, mst_client m where cp.client_id = m.client_id and cp.client_id = ?) mcp WHERE a.project_id = mcp.project_id and a.project_id = ?";
  var para = [member_id,planned_end_date,client_id,project_id];
  if(client_id != null)
  {
    if(project_id != null)
    {
      if(member_id != null)
      {
        if(planned_end_date != null)
        {
          q = q; 
          para = [member_id,planned_end_date,client_id,project_id];
        }  
        else
        {
          q = q.replace(" where planned_end_date >= ?", "");
          para = [member_id,client_id,project_id];
        }  
      }
      else
      {
        if(planned_end_date != null)
        {
          q = q.replace(" WHERE member_id = ?", "");
          para = [planned_end_date,client_id,project_id];
        }  
        else
        {
          q = q.replace(" WHERE member_id = ?", "").replace(" where planned_end_date >= ?", "");
          para = [client_id,project_id];
        }  
      }
    }
    else
    {
      if(member_id != null)
      {
        if(planned_end_date != null)
        {
          q = q.replace(" and a.project_id = ?", "");
          para = [member_id,planned_end_date,client_id];
        }  
        else
        {
          q = q.replace(" and a.project_id = ?", "").replace(" where planned_end_date >= ?", "");
          para = [member_id,client_id];
        }  
      }
      else
      {
        if(planned_end_date != null)
        {
          q = q.replace(" and a.project_id = ?", "").replace(" WHERE member_id = ?", "");
          para = [planned_end_date,client_id];
        }  
        else
        {
          q = q.replace(" and a.project_id = ?", "").replace(" WHERE member_id = ?", "").replace(" where planned_end_date >= ?", "");
          para = [client_id];
        }  
      }
    }
  }
  else
  {
    if(project_id != null)
    {
      if(member_id != null)
      {
        if(planned_end_date != null)
        {
          q = q.replace(" and cp.client_id = ?", "");
          para = [member_id,planned_end_date,project_id];
        }
        else
        {
          q = q.replace(" and cp.client_id = ?", "").replace(" where planned_end_date >= ?", "");
          para = [member_id,project_id];
        }
      }
      else
      {
        if(planned_end_date != null)
        {
          q = q.replace(" and cp.client_id = ?", "").replace(" WHERE member_id = ?", "");
          para = [planned_end_date,project_id];
        }  
        else
        {
          q = q.replace(" and cp.client_id = ?", "").replace(" WHERE member_id = ?", "").replace(" where planned_end_date >= ?", "");
          para = [project_id];
        }  
      }
    }
    else
    {
      if(member_id != null)
      {
        if(planned_end_date != null)
        {
          q = q.replace(" and cp.client_id = ?", "").replace(" and a.project_id = ?", "");
          para = [member_id,planned_end_date];
        }  
        else
        {
          q = q.replace(" and cp.client_id = ?", "").replace(" and a.project_id = ?", "").replace(" where planned_end_date >= ?", "");
          para = [member_id];
        }  
      }
      else
      {
        if(planned_end_date != null)
        {
          q = q.replace(" and cp.client_id = ?", "").replace(" and a.project_id = ?", "").replace(" WHERE member_id = ?", "");
          para = [planned_end_date];
        }
        else
        {
          q = q.replace(" and cp.client_id = ?", "").replace(" and a.project_id = ?", "").replace(" WHERE member_id = ?", "").replace(" where planned_end_date >= ?", "");
          para = [];
        }
      }
    }
  }  
  sql.query(q, para, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("get tasks: ", {res});
    result(null, {res});
  });
};

module.exports = TaskAssign;
