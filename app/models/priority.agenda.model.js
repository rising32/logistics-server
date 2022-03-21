const sql = require("./db.js");

const PriorityAgenda = function(pa) {  
  this.pa_id = pa.pa_id;
  this.wp_id = pa.wp_id;
  this.user_id = pa.user_id;
  this.planned_date = pa.planned_date;
  this.planned_time = pa.planned_time;
  this.content = pa.content;
  this.level = pa.level;
};

//Add new PriorityAgenda
PriorityAgenda.addPriorityAgenda = (newPA, result) => {
  sql.query("INSERT INTO tbl_priority_agenda SET ?", newPA, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newPA.pa_id = res.insertId;
    console.log("created new Team: ", newPA);
    result(null, newPA);
  });
};

//Get All PriorityAgenda by user id
PriorityAgenda.getAgendaByWpId = (wp_id, result) => {
  sql.query("SELECT * FROM tbl_priority_agenda WHERE wp_id = ?", wp_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("found PriorityAgenda: ", {agenda:res});
    result(null, {agenda:res});
  });
};

//Get All PriorityAgenda by user id, week
PriorityAgenda.getAgendaByWeek = (user_id, week, result) => {
  sql.query("SELECT * FROM `tbl_priority_agenda` WHERE user_id = ? and week = ?", 
  [user_id, week], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Team: ", {user_id:user_id, agenda:res});
    result(null, {user_id:user_id, agenda:res});
  });
};

PriorityAgenda.updateByPriorityAgenda = (p, result) => {
  sql.query(
    "UPDATE tbl_priority_agenda SET wp_id = ?, user_id = ?,planned_date = ?, planned_time = ?,content = ?,level = ? WHERE pa_id = ?",
    [ p.wp_id,p.user_id, p.planned_date, p.planned_time, p.content,p.level, p.pa_id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found agenda with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated agenda: ", { ...p });
      result(null, {...p });
    }
  );
};


module.exports = PriorityAgenda;
