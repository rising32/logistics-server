const sql = require("./db.js");

const Task = function(task) {
  this.task_id = task.task_id;
  this.creator_id = task.creator_id,
  this.project_id = task.project_id;
  this.task_name = task.task_name;
  this.deliverable = task.deliverable;
  this.planned_start_date = task.planned_start_date;
  this.planned_end_date = task.planned_end_date;
  this.actual_start_date = task.actual_start_date;
  this.actual_end_date = task.actual_end_date;
  this.description = task.description;
  this.priority = task.priority;
  this.hourly_rate = task.hourly_rate;
  this.is_add_all = task.is_add_all;
  this.is_active = task.is_active;
};

Task.insertNewTask = (newTask, result) => {
  sql.query("INSERT INTO tbl_priority_task SET ?", newTask, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newTask.task_id = res.insertId;
    console.log("created new Task: ", {task:newTask });
    result(null, { task:newTask });
  });
};

//Get All Project's Tasks
Task.getProjectTasks = (project_id, result) => {
  sql.query("select * from tbl_priority_task where project_id = ?", project_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Team: ", {task:res});
    result(null, {task:res});
  });
};

//Get All User's Tasks
Task.getUserTasks = (creator_id, result) => {
  sql.query("select * from tbl_priority_task where creator_id = ?", creator_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("get User's all tasks: ", {task:res});
    result(null, {task:res});
  });
};

Task.updateByTask = (p, result) => {
    sql.query(
      "UPDATE tbl_priority_task SET creator_id = ?,project_id = ?,task_name = ?, deliverable=?, priority = ?, planned_start_date = ?,planned_end_date = ?,actual_start_date = ?,actual_end_date = ?,description = ?,hourly_rate = ?,is_add_all = ?, is_active=? WHERE task_id = ?",
      [ p.creator_id,p.project_id,p.task_name,p.deliverable,p.priority, p.planned_start_date, p.planned_end_date,p.actual_start_date,p.actual_end_date,p.description,p.hourly_rate,p.is_add_all,p.is_active, p.task_id], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found task with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated task: ", { ...p });
        result(null, {...p });
      }
    );
  };

  Task.assignTaskToDeveloper = (newTask, result) => {
    sql.query("INSERT INTO tbl_task_assign SET ?", newTask, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      newTask.task_id = res.insertId;
      console.log("created new Task: ", {task:newTask });
      result(null, { task:newTask });
    });
  };

module.exports = Task;
