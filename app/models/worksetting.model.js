const sql = require("./db.js");
const Util = require("../common/common.util.js");
const res = require("express/lib/response");

const WorkSetting = function(work_setting) {
  this.ws_id = work_setting.ws_id;
  this.user_id = work_setting.user_id;
  this.week = work_setting.week;
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

WorkSetting.createWorkSettingByArray = (workSettingArray, result) => {
  sql.query("INSERT INTO tbl_work_setting (user_id, week, year, first_day_of_week, work_on_week, start_work_time, end_work_time,remainder) VALUES ?",
     [workSettingArray], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created WorkSettings: ", { ...workSettingArray });
    result(null, {...workSettingArray });
  });
};

WorkSetting.getWorkSettingByUserId = (user_id, result) => {    
  sql.query(
      "SELECT * FROM `tbl_work_setting` WHERE user_id = ?", user_id, (err, res) => 
      {
          if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
          }    
          console.log("Your Work Settings: ", res);
          result(null, res);
      });
  };

WorkSetting.updateByWorkSetting = (work_setting, result) => {
    sql.query(
      "UPDATE tbl_work_setting SET user_id = ?, week = ?, first_day_of_week = ?, work_on_week = ?, start_work_time = ?, end_work_time = ?, remainder = ? WHERE ws_id = ?",
      [ work_setting.user_id,
        work_setting.week,
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
