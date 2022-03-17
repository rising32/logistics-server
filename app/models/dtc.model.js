const sql = require("./db.js");

const DTC = function(dtc) {
  this.user_id = dtc.user_id;
  this.date_format = dtc.date_format;
  this.time_format = dtc.time_format;
  this.currency = dtc.currency;
  this.decimal_seperator = dtc.decimal_seperator;
};

DTC.insertNewDTC = (newDTC, result) => {
  sql.query("INSERT INTO tbl_date_time_currency SET ?", newDTC, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new DTC: ", { dtc_id: res.insertId, ...newDTC });
    result(null, { dtc_id: res.insertId, ...newDTC });
  });
};

DTC.updateByDTC = (dtc, result) => {
    sql.query(
      "UPDATE tbl_date_time_currency SET user_id = ?, date_format = ?, time_format = ?, currency = ?, decimal_seperator = ? WHERE dtc_id = ?",
      [ dtc.user_id,
        dtc.date_format,
        dtc.time_format,
        dtc.currency,
        dtc.decimal_seperator,
        dtc.dtc_id
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found dtc with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated dtc: ", { ...dtc });
        result(null, {...dtc });
      }
    );
  };

module.exports = DTC;
