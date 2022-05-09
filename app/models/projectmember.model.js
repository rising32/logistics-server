const sql = require("./db.js");

const ProjectMember = function(pm) {
  this.project_id = pm.project_id;
  this.user_id = pm.user_id;
  this.is_manager = pm.is_manager;
};

ProjectMember.insertNewProjectMember = (newProjectMember, result) => {
  sql.query("INSERT INTO tbl_project_member SET ?", newProjectMember, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new ProjectMember: ", { pm_id: res.insertId, ...newProjectMember });
    result(null, { pm_id: res.insertId, ...newProjectMember });
  });
};

ProjectMember.updateByProjectMember = (pm, result) => {
    sql.query(
      "UPDATE tbl_project_member SET project_id = ?, user_id = ?, is_manager = ? WHERE pm_id = ?",[ pm.project_id, pm.user_id, pm.is_manager, pm.pm_id], (err, res) => {
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

ProjectMember.checkIfMemberExistInProject = (task_id, member_id, result) => {
  sql.query(
    "SELECT a.project_id, pm.user_id from (SELECT project_id FROM tbl_priority_task WHERE task_id = ?) a LEFT JOIN tbl_project_member pm ON a.project_id = pm.project_id AND pm.user_id = ?",[task_id, member_id], (err, res)=>{
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, {res});
    }
  );
}

ProjectMember.checkIfMemberExistInPro = (project_id, user_id, result) => {
  sql.query(
    "SELECT * from tbl_project_member where project_id = ? AND user_id = ?",[project_id, user_id], (err, res)=>{
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, {res});
    }
  );
}

module.exports = ProjectMember;
