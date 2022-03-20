const sql = require("./db.js");

const Priority = function(priority) {  
  this.wp_id = priority.wp_id;
  this.user_id = priority.user_id;
  this.week = priority.week;
  this.priority_num = priority.priority_num;
  this.description = priority.description;
  this.goal = priority.goal;
  this.detail = priority.detail;
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
  sql.query("SELECT * FROM `tbl_week_priority` WHERE user_id = ?", 
  user_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Team: ", {user_id:user_id, priority:res});
    result(null, {user_id:user_id, priority:res});
  });
};

//Get All Priority by user id, week
Priority.getPriorityByUserId = (user_id, week, result) => {
  sql.query("SELECT * FROM `tbl_week_priority` WHERE user_id = ? and week = ?", 
  user_id, week, (err, res) => {
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
    "UPDATE tbl_week_priority SET user_id = ?,week = ?, priority_num = ?,description = ?,goal = ?,detail = ? WHERE wp_id = ?",
    [ p.user_id, p.week, p.priority_num, p.description,p.goal,p.detail, p.wp_id], (err, res) => {
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
