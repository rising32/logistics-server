const sql = require("./db.js");

const Deliverable = function(deliverable) {  
  this.deliverable_id = deliverable.deliverable_id;
  this.task_id = deliverable.task_id;
  this.user_id = deliverable.user_id;
  this.periority_id = deliverable.periority_id;
  this.deliverable_name = deliverable.deliverable_name;
  this.planned_end_date = deliverable.planned_end_date;
  this.end_date = deliverable.end_date;
  this.budget = deliverable.budget;
  this.is_completed = deliverable.is_completed;
};

//Add new Deliverable
Deliverable.addDeliverable = (newDeliverable, result) => {
  sql.query("INSERT INTO tbl_deliverable SET ?", newDeliverable, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newDeliverable.deliverable_id = res.insertId;
    console.log("created new Team: ", newDeliverable);
    result(null, newDeliverable);
  });
};

//Get Deliverable by Id
Deliverable.getDeliverableById = (deliverable_id, result) => {
  sql.query("SELECT * FROM `tbl_deliverable` WHERE deliverable_id = ?", deliverable_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new deliverable: ", {deliverable:res[0]});
    result(null, {deliverable:res[0]});
  });
};

//Get completed Deliverable by Planned End date
Deliverable.getDeliverableByPlannedEndDate = (user_id, planned_end_date, result) => {
  sql.query("SELECT * FROM tbl_deliverable WHERE user_id = ? and planned_end_date = ?", [user_id, planned_end_date], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("found Priority: ", {user_id:user_id, deliverable:res});
    result(null, {user_id:user_id, deliverable:res});
  });
};

//Get completed Deliverable by Planned End date
Deliverable.getDeliverableByEndDate = (user_id, end_date, result) => {
  sql.query("SELECT * FROM tbl_deliverable WHERE user_id = ? and end_date = ?", [user_id, end_date], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("found Priority: ", {user_id:user_id, deliverable:res});
    result(null, {user_id:user_id, deliverable:res});
  });
};

//Update Deliverable by Id
Deliverable.updateByDeliverable = (d, result) => {
  sql.query(
    "UPDATE tbl_deliverable SET task_id = ?,periority_id = ?,deliverable_name = ?,start_date = ?,end_date = ?,budget = ?,is_completed = ? WHERE deliverable_id = ?", 
      [d.task_id,d.periority_id, d.deliverable_name, d.start_date, d.end_date, d.budget, d.is_completed, d.deliverable_id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Deliverable with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Deliverable: ", { ...d });
      result(null, {...d });
    }
  );
};


module.exports = Deliverable;
