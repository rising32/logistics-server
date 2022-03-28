const sql = require("./db.js");

const Priority = function(priority) {  
  this.wp_id = priority.wp_id;
  this.user_id = priority.user_id;
  this.week = priority.week;
  this.priority_num = priority.priority_num;
  this.goal = priority.goal;
  this.deliverable = priority.deliverable;
  this.detail = priority.detail;
  this.is_completed = priority.is_completed;
  this.is_weekly = priority.is_weekly;
  this.end_date = priority.end_date;
};

//Add new Priority
Priority.addPriority = (newPriority, result) => {
  sql.query("INSERT INTO tbl_week_priority SET ?", newPriority, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newPriority.wp_id = res.insertId;
    console.log("created new Team: ", newPriority);
    result(null, newPriority);
  });
};

//Get All Priority by user id
Priority.getPriorityByUserId = (user_id, result) => {
  sql.query("SELECT * FROM tbl_week_priority WHERE user_id = ?", user_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("found Priority: ", {user_id:user_id, priority:res});
    result(null, {user_id:user_id, priority:res});
  });
};

//Get completed Priority by End date
Priority.getPriorityByEndDate = (user_id, end_date, result) => {
  sql.query("SELECT * FROM tbl_week_priority WHERE user_id = ? and end_date = ? and is_completed = 1", [user_id, end_date], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("found Priority: ", {user_id:user_id, priority:res});
    result(null, {user_id:user_id, priority:res});
  });
};

//Get All Priority by user id, week
Priority.getPriorityByWeek = (user_id, week, result) => {
  sql.query("SELECT * FROM `tbl_week_priority` WHERE user_id = ? and week = ?", 
  [user_id, week], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Team: ", {user_id:user_id, priority:res});
    result(null, {user_id:user_id, priority:res});
  });
};

//Get All Priority by user id, before week
Priority.getPriorityByBeforeWeek = (user_id, week, result) => {
  sql.query("SELECT * FROM `tbl_week_priority` WHERE user_id = ? and week < ?", 
  [user_id, week], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Team: ", {user_id:user_id, priority:res});
    result(null, {user_id:user_id, priority:res});
  });
};

Priority.updateByPriority = (p, result) => {
  sql.query(
    "UPDATE tbl_week_priority SET user_id = ?,week = ?, priority_num = ?,goal = ?,deliverable = ?,detail = ?,is_completed = ?,is_weekly = ? ,end_date = ? WHERE wp_id = ?",
    [ p.user_id, p.week, p.priority_num, p.goal,p.deliverable,p.detail,p.is_completed,p.is_weekly,p.end_date, p.wp_id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found priority with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated priority: ", { ...p });
      result(null, {...p });
    }
  );
};


module.exports = Priority;
