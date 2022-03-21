const sql = require("./db.js");

const Deliverable = function(deliverable) {  
  this.deliverable_id = deliverable.deliverable_id;
  this.task_id = deliverable.task_id;
  this.deliverable_name = deliverable.deliverable_name;
  this.periority = deliverable.periority;
  this.description = deliverable.description;
  this.planned_start_date = deliverable.planned_start_date;
  this.planned_end_date = deliverable.planned_end_date;
  this.budget = deliverable.budget;
  this.actual_start_time = deliverable.actual_start_time;
  this.actual_end_time = deliverable.actual_end_time;
};

//Add new Deliverable
Deliverable.addDeliverable = (newDeliverable, result) => {
  sql.query("INSERT INTO deliverable SET ?", newDeliverable, (err, res) => {
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
  sql.query("SELECT * FROM `deliverable` WHERE deliverable_id = ?", deliverable_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new deliverable: ", {deliverable_id:res});
    result(null, {deliverable_id:res});
  });
};

module.exports = Deliverable;
