const sql = require("./db.js");

const WorkSetting = function(work_setting) {
  this.ws_id = work_setting.ws_id;
  this.user_id = work_setting.user_id;
  this.first_day_of_week = work_setting.first_day_of_week;
  this.work_on_week = work_setting.work_on_week;
  this.start_work_time = work_setting.start_work_time;
  this.end_work_time = work_setting.end_work_time;
  this.remainder = work_setting.remainder;
};

WorkSetting.insertNewWorkSetting = (newWorkSetting, result) => {
  sql.query("INSERT INTO tbl_work_setting SET ?", newWorkSetting, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new WorkSetting: ", { ws_id: res.insertId, ...newWorkSetting });
    result(null, { ws_id: res.insertId, ...newWorkSetting });
  });
};

WorkSetting.updateByWorkSetting = (work_setting, result) => {
    sql.query(
      "UPDATE tbl_work_setting SET user_id = ?, first_day_of_week = ?, work_on_week = ?, start_work_time = ?, end_work_time = ?, remainder = ? WHERE ws_id = ?",
      [ work_setting.user_id,
        work_setting.first_day_of_week,
        work_setting.work_on_week,
        work_setting.start_work_time,
        work_setting.end_work_time,
        work_setting.remainder,
        work_setting.ws_id
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found work_setting with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated work_setting: ", { ...work_setting });
        result(null, {...work_setting });
      }
    );
  };

module.exports = WorkSetting;
