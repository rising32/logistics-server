const sql = require("./db.js");

const Employee = function(employee) {
    this.employee_id = employee.employee_id,
    this.user_id = employee.user_id,
    this.employee_code = employee.employee_code;
    this.employee_name = employee.employee_name;
};

Employee.insertNewEmployee = (newClient, result) => {
  sql.query("INSERT INTO tbl_employee SET ?", newClient, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Employee: ", { client_id: res.insertId, ...newClient });
    result(null, { client_id: res.insertId, ...newClient });
  });
};

Employee.updateByEmployee = (employee, result) => {
    sql.query(
      "UPDATE tbl_employee SET user_id = ?, employee_code = ?, employee_name = ? WHERE employee_id = ?",
      [employee.user_id, employee.employee_code,employee.employee_name, employee.employee_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found employee with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated employee: ", { ...employee });
        result(null, {...employee });
      }
    );
  };

Employee.registMyEmployee = (user_id, employee, result) => {    
    sql.query(
        "INSERT INTO tbl_employee SET user_id = ?, client_id = ?, is_active = ?", 
        [user_id, employee.client_id, employee.is_active], 
        (err, res) => 
        {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }    
            console.log("created my Employee: ", { uc_id: res.insertId, user_id : user_id, ...employee});
            result(null, { uc_id: res.insertId, user_id : user_id, ...employee });
        });
    };

Employee.getMyEmployees = (user_id, result) => {    
    sql.query(
        "select c.* from tbl_employee c, (SELECT * FROM tbl_user_client WHERE user_id = ?) uc where c.client_id = uc.client_id", 
        user_id, (err, res) => 
        {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }    
            console.log("created my Employee: ", { user_id : user_id, clients:res});
            result(null, { user_id : user_id, clients:res });
        });
    };

module.exports = Employee;
