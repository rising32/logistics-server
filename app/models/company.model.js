const sql = require("./db.js");

const Company = function(company) {
  this.company_name = company.company_name;
};

Company.insertNewCompany = (newCompany, result) => {
  sql.query("INSERT INTO mst_company SET ?", newCompany, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Company: ", { company_id: res.insertId, ...newCompany });
    result(null, { company_id: res.insertId, ...newCompany });
  });
};

Company.updateByCompany = (company, result) => {
    sql.query(
      "UPDATE mst_company SET company_name = ? WHERE company_id = ?",
      [company.company_name, company.company_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found company with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated company: ", { ...company });
        result(null, {...company });
      }
    );
  };

module.exports = Company;
