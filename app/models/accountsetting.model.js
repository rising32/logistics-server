const sql = require("./db.js");

const AccountSetting = function(as) {
  this.as_id = as.as_id;
  this.user_id = as.user_id;
  this.date_format = as.date_format;
  this.time_format = as.time_format;
  this.currency = as.currency;
  this.decimal_seperator = as.decimal_seperator;
};

AccountSetting.insertNewAS = (newAS, result) => {
  sql.query("INSERT INTO tbl_account_setting SET ?", newAS, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new AccountSetting: ", { as_id: res.insertId, ...newAS });
    result(null, { as_id: res.insertId, ...newAS });
  });
};

AccountSetting.getAccountSettingByUserId = (user_id, result) => {    
  sql.query(
      "SELECT * FROM `tbl_account_setting` WHERE user_id = ?", user_id, (err, res) => 
      {
          if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
          }    
          console.log("Your AccountSetting Settings: ", res[0]);
          result(null, res[0]);
      });
  };

AccountSetting.updateByAccountSetting = (as, result) => {
    sql.query(
      "UPDATE tbl_account_setting SET user_id = ?, date_format = ?, time_format = ?, currency = ?, decimal_seperator = ? WHERE as_id = ?",
      [ as.user_id,
        as.date_format,
        as.time_format,
        as.currency,
        as.decimal_seperator,
        as.as_id
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found as with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated as: ", { ...as });
        result(null, {...as });
      }
    );
  };

module.exports = AccountSetting;
