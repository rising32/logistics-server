const sql = require("./db.js");

const ClientProject = function(cp) {
    this.cp_id = cp.cp_id;
    this.project_id = cp.project_id;
    this.client_id = cp.client_id;
    this.date_start = cp.date_start;
    this.date_end = cp.date_end;
    this.description = cp.description;
};

ClientProject.insertNewClientProject = (newCP, result) => {
  sql.query("INSERT INTO tbl_client_project SET ?", newCP, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newCP.cp_id = res.insertId;
    console.log("created new Client-Project Relation: ", { ...newCP });
    result(null, { ...newCP });
  });
};

ClientProject.updateByClientProject = (cp, result) => {
    sql.query(
      "UPDATE tbl_client_project SET project_id = ?, client_id = ?, date_start = ?, date_end = ?, description = ? WHERE cp_id = ?",
      [cp.project_id, cp.client_id,cp.date_start,cp.date_end,cp.description, cp.cp_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found cp with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated cp: ", { ...cp });
        result(null, {...cp });
      }
    );
  };

ClientProject.getClientProjects = (client_id, result) => {    
    sql.query(
        "select p.* from tbl_project p, (SELECT * FROM tbl_client_project WHERE client_id = ?) uc where p.project_id = uc.project_id", 
        client_id, (err, res) => 
        {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }    
            console.log("created my ClientProject: ", { client_id : client_id, project:res});
            result(null, { client_id : client_id, project:res });
        });
    };

ClientProject.getClientProjectByCid_Pid = (client_id, project_id, result) => {    
  sql.query(
    "SELECT * FROM tbl_client_project WHERE client_id = ? AND project_id = ?", [client_id, project_id], (err, res) => 
    {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }    
        console.log("Client's Project: ", {project:res});
        result(null, {project:res });
    });
};

module.exports = ClientProject;
