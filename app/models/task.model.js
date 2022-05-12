// const utils = require("nodemon/lib/utils");
const sql = require("./db.js");
const Util = require("../common/common.util.js");

const Task = function(task) {
  this.task_id = task.task_id;
  this.creator_id = task.creator_id,
  this.project_id = task.project_id;
  this.task_name = task.task_name;
  this.planned_start_date = task.planned_start_date;
  this.planned_end_date = task.planned_end_date;
  this.actual_start_date = task.actual_start_date;
  this.actual_end_date = task.actual_end_date;
  this.description = task.description;
  this.hourly_rate = task.hourly_rate;
  this.is_add_all = task.is_add_all;
  this.is_active = task.is_active;
  this.is_deleted = task.is_deleted;
  this.member_id = task.member_id;
  this.member_name = task.member_name;
};

const TblTask = function(task) {
  this.task_id = task.task_id;
  this.creator_id = task.creator_id,
  this.company_id = task.company_id,
  this.project_id = task.project_id;
  this.task_name = task.task_name;
  this.planned_start_date = task.planned_start_date;
  this.planned_end_date = task.planned_end_date;
  this.actual_start_date = task.actual_start_date;
  this.actual_end_date = task.actual_end_date;
  this.description = task.description;
  this.hourly_rate = task.hourly_rate;
  this.is_add_all = task.is_add_all;
  this.is_active = task.is_active;
  this.is_deleted = task.is_deleted;
};

Task.insertNewTask = (newTask, result) => {
  var task = new TblTask(newTask);
  sql.query("INSERT INTO tbl_priority_task SET ?", task, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    task.task_id = res.insertId;
    console.log("created new Task: ", {task:task });
    result(null, { task:task });
  });
};

//Get All Project's Tasks
Task.getProjectTasks = (project_id, result) => {
  sql.query("select * from tbl_priority_task where project_id = ? and is_deleted != 1", project_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Company: ", {task:res});
    result(null, {task:res});
  });
};

//Get All User's Tasks
Task.getUserTasks = (creator_id, result) => {
  sql.query("select * from tbl_priority_task where creator_id = ? and is_deleted != 1", creator_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("get User's all tasks: ", {task:res});
    result(null, {task:res});
  });
};

//Get All Company's Tasks
Task.getCompanyTasks = (company_id, result) => {
  sql.query("select * from tbl_priority_task where company_id = ? and is_deleted != 1", company_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("get Company's all tasks: ", {task:res});
    result(null, {task:res});
  });
};

//Get All User's Tasks
Task.getCompanyTasksByWeek = (company_id, week, year, result) => {
  var daterange = Util.getDateByWeek(week, year);
  console.log(daterange);
  var d1= daterange.d1;
  var d2 = daterange.d2;
  sql.query("select * from tbl_priority_task where company_id = ? and is_deleted != 1 and ((planned_start_date <= ? AND planned_end_date >= ? AND planned_end_date <= ?) OR (planned_start_date >= ? AND planned_start_date <= ?) OR (planned_start_date >= ? AND planned_start_date <= ? AND planned_end_date >= ?) OR (planned_start_date <= ? AND planned_end_date >= ?))", 
    [company_id,   d1,d1,d2,   d1,d2,   d1,d2,d2,   d1,d2], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("get User's all tasks: ", {task:res});
    result(null, {task:res});
  });
};

//Get Company's tasks linked with project or not linked with any one
Task.getCompanyTasksByPNA = (company_id, project_id, result) => {
  sql.query("SELECT * FROM `tbl_priority_task` WHERE company_id = ? and is_deleted != 1 and (project_id = ? OR project_id IS null) order by task_name", [company_id, project_id], (err, res) => {
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
      "UPDATE tbl_priority_task SET creator_id = ?,company_id = ?,project_id = ?,task_name = ?, planned_start_date = ?,planned_end_date = ?,actual_start_date = ?,actual_end_date = ?,description = ?,hourly_rate = ?,is_add_all = ?, is_active=?, is_deleted = ? WHERE task_id = ?",
      [ p.creator_id,p.company_id,p.project_id,p.task_name, p.planned_start_date, p.planned_end_date,p.actual_start_date,p.actual_end_date,p.description,p.hourly_rate,p.is_add_all,p.is_active, p.is_deleted, p.task_id], (err, res) => {
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
