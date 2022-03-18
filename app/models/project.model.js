const sql = require("./db.js");

const Project = function(project) {
  this.creator_id = project.creator_id;
  this.project_name = project.project_name;
  this.planned_start_date = project.planned_start_date;
  this.planned_end_date = project.planned_end_date;
  this.actual_start_date = project.actual_start_date;
  this.actual_end_date = project.actual_end_date;
  this.description = project.description;
};

Project.insertNewProject = (newProject, result) => {
  sql.query("INSERT INTO tbl_project SET ?", newProject, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Project: ", { project_id: res.insertId, ...newProject });
    result(null, { project_id: res.insertId, ...newProject });
  });
};

//Get All Projects
Project.getUserProjects = (creator_id, result) => {
  sql.query("select * from tbl_project where creator_id = ?", creator_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Team: ", {res});
    result(null, {res});
  });
};

Project.updateByProject = (p, result) => {
    sql.query(
      "UPDATE tbl_project SET creator_id = ?,project_name = ?, planned_start_date = ?,planned_end_date = ?,actual_start_date = ?,actual_end_date = ?,description = ? WHERE project_id = ?",
      [ p.creator_id,p.project_name, p.planned_start_date, p.planned_end_date,p.actual_start_date,p.actual_end_date,p.description, p.project_id], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found project with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated project: ", { ...p });
        result(null, {...p });
      }
    );
  };

module.exports = Project;
