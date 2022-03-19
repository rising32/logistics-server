const sql = require("./db.js");

const Precede = function(precede) {
  this.precede_id = precede.precede_id;
  this.task_id = precede.task_id,
  this.preceding = precede.preceding;
};

Precede.insertNewPrecede = (newPrecede, result) => {
  sql.query("INSERT INTO tbl_precede_task SET ?", newPrecede, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newPrecede.precede_id = res.insertId;
    console.log("created new Precede: ", {precede:newPrecede });
    result(null, { precede:newPrecede });
  });
};

//Get Task's all Precedes
Precede.getTaskPrecedes = (task_id, result) => {
  sql.query("select * from tbl_precede_task where task_id = ?", task_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log({precede:res});
    result(null, {precede:res});
  });
};

Precede.updateByPrecede = (p, result) => {
    sql.query(
      "UPDATE tbl_precede_task SET task_id = ?,preceding = ? WHERE precede_id = ?", [p.task_id,p.preceding, p.precede_id], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found precede with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated precede: ", { ...p });
        result(null, {...p });
      }
    );
  };

module.exports = Precede;
