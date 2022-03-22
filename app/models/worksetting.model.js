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

WorkSetting.getWorkDaysPerWeek = (client_id, user_id,result) => {    
  sql.query(
      "SELECT * FROM `tbl_client_project` WHERE client_id = ?", client_id, (err, res) => 
      {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }    
        var date_start = res[0].date_start;
        var date_end = res[0].date_end;
        sql.query(
          "SELECT * FROM `tbl_work_setting` WHERE user_id = ?", user_id, (err, resWS) => 
          {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            } 
            var realWorkdays = Util.getWorkDaysPerWeek(date_start, date_end, resWS);
            console.log(realWorkdays);
            result(null, {realWorkdays:realWorkdays});
          });  
        
      });
  };
  

function getWorkDaysPerWeek(start_date, end_date, user_id)
{
  var ws = null;
  sql.query(
    "SELECT * FROM `tbl_work_setting` WHERE user_id = ?", user_id, (err, res) => 
    {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } 
        ws = res;        
        var weekFirst = Util.getWeekNumber(new Date(start_date));
        var weekEnd = Util.getWeekNumber(new Date(end_date));
        var weekdayFirst = new Date(start_date).getDay();
        var weekdayEnd = new Date(end_date).getDay();
        var weekWorkday = [];
        
        for(var i = 0; i < ws.length; i++)    
        {          
          if(ws[i].week >= weekFirst && ws[i].week <= weekEnd)
          {            
            if(ws[i].week == weekFirst)
            {              
                var remindWorkdays = ws[i].work_on_week - weekdayFirst + 1;                
                weekWorkday.push({week:weekFirst, workdays:remindWorkdays});
            }
            else if(ws[i].week > weekFirst && ws[i].week < weekEnd)
                weekWorkday.push({week:ws[i].week, workdays:ws[i].work_on_week});
            else
            {              
              weekWorkday.push({week:weekEnd, workdays:weekdayEnd});
              break;
            }
          }      
        }
        console.log(weekWorkday);
        result(null, weekWorkday);        
    });    
}

module.exports = WorkSetting;
