const sql = require("./db.js");
const Util = require("../common/common.util.js");

const Project = function(project) {
  this.project_id = project.project_id;
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


//=================================================== Get plan work days for client from tbl_client_project =======================================================================

// Get real Work day list per client, week
Project.getWorkDaysPerWeek = (user_id,result) => {  
  var data = [];
  sql.query(
      "SELECT m.client_name, c.* FROM `tbl_client_project` c, mst_client m where m.client_id = c.client_id", (err, res) => 
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

// Get real Work day list per client monthly
Project.getWorkDaysPerMonth = (user_id,result) => {         
var data = [];
var per_month_dates = [];
sql.query(
    "SELECT m.client_name, c.* FROM `tbl_client_project` c, mst_client m where m.client_id = c.client_id", (err, res) => 
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
          
          //===================================================== monthly work days plan data ==========================
          //get monthly work days from work settings
          var first_day = resWS[0].first_day_of_week;
          if(first_day < 10) 
            first_day = '0' + first_day;
          var first_day_this_year = new Date(year + "-01-" + first_day); 
          var end_day_this_year = new Date(year+"-12-31");
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
          }
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
          // console.log(data);
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


module.exports = Project;
