const sql = require("./db.js");

const ProjectManager = function(pm) {
  this.project_id = pm.project_id;
  this.user_id = pm.user_id;
};

ProjectManager.insertNewProjectManager = (newProjectManager, result) => {
  sql.query("INSERT INTO tbl_project_manager SET ?", newProjectManager, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new ProjectManager: ", { pm_id: res.insertId, ...newProjectManager });
    result(null, { pm_id: res.insertId, ...newProjectManager });
  });
};

ProjectManager.updateByProjectManager = (pm, result) => {
    sql.query(
      "UPDATE tbl_project_manager SET project_id = ?, user_id = ? WHERE pm_id = ?",[ pm.project_id, pm.user_id, pm.pm_id], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found pm with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated pm: ", { ...pm });
        result(null, {...pm });
      }
    );
  };

module.exports = ProjectManager;
