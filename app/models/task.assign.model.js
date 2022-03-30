const sql = require("./db.js");
const Util = require("../common/common.util.js");
const Task = require("../models/task.model.js");

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
TaskAssign.getUCPT = (user_id, member_id,client_id,project_id,planned_end_date, result) => {  
  var q = "SELECT a.*, mcp.client_id, mcp.client_name FROM (SELECT a.member_id, p. * from (SELECT * FROM tbl_task_assign WHERE member_id = ?) a, (SELECT * from tbl_priority_task where planned_end_date <= ?) p where a.task_id = p.task_id) a, (SELECT cp.*, m.client_name from tbl_client_project cp, tbl_user_client uc, mst_client m where cp.client_id = m.client_id and uc.client_id = cp.client_id and uc.user_id = ? and cp.client_id = ?) mcp WHERE a.project_id = mcp.project_id and a.project_id = ? ORDER BY mcp.client_name";
  var para = [member_id,planned_end_date,user_id, client_id,project_id];
  if(client_id != null)
  {
    if(project_id != null)
    {
      if(member_id != null)
      {
        if(planned_end_date == null)
        {
          q = q.replace(" where planned_end_date <= ?", "");
          para = [member_id,user_id,client_id,project_id];
        }  
      }
      else
      {
        q = q.replace(" WHERE member_id = ?", "");
        para = [planned_end_date,user_id,client_id,project_id];

        if(planned_end_date == null)
        {
          q = q.replace(" where planned_end_date <= ?", "");
          para = [user_id,client_id,project_id];
        }  
      }
    }
    else
    {
      q = q.replace(" and a.project_id = ?", "");
      para = [member_id,planned_end_date,user_id,client_id];

      if(member_id != null)
      {
        if(planned_end_date == null)
        {
          q = q.replace(" where planned_end_date <= ?", "");
          para = [member_id,user_id,client_id];
        }  
      }
      else
      {
        q = q.replace(" WHERE member_id = ?", "");
        para = [planned_end_date,user_id,client_id];

        if(planned_end_date == null)
        {
          q = q.replace(" where planned_end_date <= ?", "");
          para = [user_id,client_id];
        }  
      }
    }
  }
  else
  {
    q = q.replace(" and cp.client_id = ?", "");
    para = [member_id,planned_end_date,user_id,project_id];

    if(project_id != null)
    {
      if(member_id != null)
      {
        if(planned_end_date == null)
        {
          q = q.replace(" where planned_end_date <= ?", "");
          para = [member_id,user_id,project_id];
        }
      }
      else
      {
        q = q.replace(" WHERE member_id = ?", "");
        para = [planned_end_date,user_id,project_id];

        if(planned_end_date == null)
        {
          q = q.replace(" where planned_end_date <= ?", "");
          para = [user_id,project_id];
        }  
      }
    }
    else
    {
      q = q.replace(" and a.project_id = ?", "");
      para = [member_id,user_id,planned_end_date];

      if(member_id != null)
      { 
        if(planned_end_date == null)
        {
          q = q.replace(" where planned_end_date <= ?", "");
          para = [member_id,user_id];
        }  
      }
      else
      {
        q = q.replace(" WHERE member_id = ?", "");
        para = [planned_end_date,user_id];

        if(planned_end_date == null)
        {
          q = q.replace(" where planned_end_date <= ?", "");
          para = [user_id];
        }
      }
    }
  }  
  console.log(q);
  console.log(para);
  sql.query(q, para, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var week = Util.getWeekNumber(new Date(planned_end_date));
    var data = [];
    if(res.length > 0)
    {
      data = [
        {
          week : week,
          client_id:res[0].client_id, 
          client_name:res[0].client_name, 
          member_id:res[0].member_id,        
          task:[new Task(res[0])]
        }
      ];    
      for(var i = 1; i < res.length; i++)
      {
        var is_newClient = true;
        data.forEach(element => {
          if(element.client_id == res[i].client_id)
          {
            is_newClient = false;
            var is_new = true; 
            element.task.forEach(ta => {
              if(ta.task_id == res[i].task_id)
                is_new = false;
            });
            if(is_new)
              element.task.push(new Task(res[i]));
          }
        });
        if(is_newClient)
          data.push({
            week : week,
            client_id:res[i].client_id, 
            client_name:res[i].client_name, 
            member_id:res[i].member_id,        
            task:[new Task(res[i])]})
      }
    }
    console.log("get tasks: ", data);
    result(null, data);
  });
};

module.exports = TaskAssign;
