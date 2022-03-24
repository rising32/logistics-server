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

WorkSetting.getWorkDaysPerWeek = (user_id,result) => {  
  var data = [];
  sql.query(
      "SELECT m.client_name, c.* FROM `tbl_client_project` c, mst_client m where m.client_id = c.client_id", [], (err, res) => 
      {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }        
        sql.query(
          "SELECT week, work_on_week, IF(work_on_week IS NULL, '', '') work_days FROM `tbl_work_setting` WHERE user_id = ?", user_id, (err, resWS) => 
          {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }    
            for(var i = 0; i < res.length; i++) 
            {
              var weekData = [];
              for(var j = 0; j < resWS.length; j++)       
                weekData.push({week:resWS[j].week, work_days : 0});

              var date_start = res[i].date_start;
              var date_end = res[i].date_end;
              var realWorkdays = Util.getWorkDaysPerWeek(date_start, date_end, resWS, weekData);
              data.push({client_id:res[i].client_id, client_name:res[i].client_name, realWorkdays:realWorkdays});                  
            } 
            var removeIndexes = [];
            for(var i = 0; i < data.length; i++) 
            {
              for(var j = i + 1; j < data.length; j++)
              {
                //if client is same one, plus the work_days with work_days
                if(data[i].client_id != data[j].client_id) continue;   
                removeIndexes.push(j);             
                for(var k = 0; k < data[j].realWorkdays.length; k++)
                  data[i].realWorkdays[k].work_days += data[j].realWorkdays[k].work_days;                
              }
              if(removeIndexes.length > 0)
                for(var k = 0; k < removeIndexes.length; k++)
                  data.pop(data[k]);
            }
            result(null, {data:data});
          });  
        
      });
  };  
WorkSetting.getWorkDaysPerMonth = (user_id,result) => {         
var data = [];
var per_month_dates = [];
sql.query(
    "SELECT m.client_name, c.* FROM `tbl_client_project` c, mst_client m where m.client_id = c.client_id", [], (err, res) => 
    {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      } 
      var year = new Date().getFullYear();       
      sql.query(
        "SELECT week, work_on_week, IF(work_on_week IS NULL, '', '') work_days, first_day_of_week	FROM `tbl_work_setting` WHERE user_id = ? and year = ?", [user_id, year], (err, resWS) => 
        {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          
          //===================================================== monthly work days data ==========================
          //get monthly work days from work settings
          var first_day = resWS[0].first_day_of_week;
          if(first_day < 10) 
            first_day = '0' + first_day;
          var first_day_this_year = new Date(year + "-01-" + first_day); 
          var end_day_this_year = new Date(year+"-03-27");
          pmd = Util.splitRangeDate(first_day_this_year, end_day_this_year);
          var mwd = [];
          for(var j = 0; j < pmd.length; j++)
          {
            //Calculate sum of monthly work days from day range
            var weekData = [];
            for(var k = 0; k < resWS.length; k++)       
              weekData.push({week:resWS[k].week, work_days : 0});

            var realWorkdays = Util.getSumWorkDaysPerMonth(pmd[j].start_date, pmd[j].end_date, resWS, weekData);                       
            mwd.push(realWorkdays);
            // console.log(mwd);   
          }
          //data.push({client_id:-1, client_name:"Available", realWorkdays : mwd});
          //===================================================== Statistic Client - Project data ====================
          for(var i = 0; i < res.length; i++) 
          {            
            var date_start = res[i].date_start;
            var date_end = res[i].date_end;

            //Split day range to days per month;
            per_month_dates = Util.splitRangeDate(date_start, date_end);
            var month_work_days = [];
            for(var j = 0; j < per_month_dates.length; j++)
            {
              //Calculate sum of monthly work days from day range
              var weekData = [];
              for(var k = 0; k < resWS.length; k++)       
                weekData.push({week:resWS[k].week, work_days : 0});
              
              var realWorkdays = Util.getSumWorkDaysPerMonth(per_month_dates[j].start_date, per_month_dates[j].end_date, resWS, weekData);   
              data.push({client_id:res[i].client_id, client_name:res[i].client_name, realWorkdays : realWorkdays});               
            }                   
          }     
          console.log(data);
          var removeIndexes = [];
          for(var i = 0; i < data.length; i++) 
          {
            for(var j = i + 1; j < data.length; j++)
            {
              //if client is same one, plus the work_days with work_days
              if(data[i].client_id != data[j].client_id) continue;
              if(data[i].realWorkdays.month == data[j].realWorkdays.month)
              {
                if(removeIndexes.indexOf(j) == -1)
                  removeIndexes.push(j); 
                data[i].realWorkdays.work_days += data[j].realWorkdays.work_days;
              }   
            }            
          }
          
          //remove item with same client_id and month
          var tmp_data = [...data];
          for(var k = 0; k < removeIndexes.length; k++)
            data.splice(data.indexOf(tmp_data[removeIndexes[k]]), 1);

          //combine real work days by client_id
          var result_data = [];
          for(var i = 0; i < data.length; i++) 
          {         
            var is_new = true;   
            result_data.forEach(element => {
              if(element.client_id == data[i].client_id)
              {
                is_new = false;
                element.realWorkdays.push(data[i].realWorkdays);
              } 
            });
            if(is_new)
              result_data.push({client_id: data[i].client_id, client_name:data[i].client_name, realWorkdays:[data[i].realWorkdays]});
          }
          result_data.splice(0, 0, {client_id:-1, client_name:"Available", realWorkdays : mwd});
          console.log(result_data);
          result(null, {data:result_data});
        });        
    });
};


module.exports = WorkSetting;
