const sql = require("./db.js");
const Util = require("../common/common.util.js");

const Project = function(project) {
  this.project_id = project.project_id;
  this.creator_id = project.creator_id;
  this.project_name = project.project_name;
  this.project_type = project.project_type;
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
    newProject.project_id = res.insertId;
    console.log("created new Project: ", { ...newProject });
    result(null, {...newProject });
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

    console.log("created new Team: ", {project:res});
    result(null, {project:res});
  });
};

//Get All Projects
Project.getClientProjectsNoAssign = (creator_id, client_id, result) => {
  sql.query("SELECT a.* FROM (SELECT p.*, cp.client_id from (SELECT * FROM tbl_project WHERE creator_id = ?) p LEFT JOIN tbl_client_project cp ON p.project_id = cp.project_id) a WHERE a.client_id = ? OR a.client_id IS null", 
    [creator_id, client_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new Team: ", {project:res});
    result(null, {project:res});
  });
};

Project.updateByProject = (p, result) => {
    sql.query(
      "UPDATE tbl_project SET creator_id = ?,project_name = ?,project_type = ?, planned_start_date = ?,planned_end_date = ?,actual_start_date = ?,actual_end_date = ?,description = ? WHERE project_id = ?",
      [ p.creator_id,p.project_name,p.project_type, p.planned_start_date, p.planned_end_date,p.actual_start_date,p.actual_end_date,p.description, p.project_id], (err, res) => {
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
//=================================================== Project Type ===============================================================================================================
Project.createType = (project_type, result) => {
  sql.query("INSERT INTO tbl_project_type SET project_type = ?", [project_type], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created new Project: ", {pt_id:res.insertId, project_type:project_type });
    result(null, {pt_id:res.insertId, project_type:project_type });
  });
};

//Get All Projects
Project.getProjectTypes = (result) => {
  sql.query("select * from tbl_project_type", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, {project_type:res});
  });
};

Project.updateByType = (pt_id, project_type, result) => {
  sql.query(
    "UPDATE tbl_project_type SET project_type = ? WHERE pt_id = ?", [project_type, pt_id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated project type: ", {pt_id:pt_id, project_type:project_type});
      result(null, {pt_id:pt_id, project_type:project_type});
    }
  );
};
//=================================================== Get plan work days for client from tbl_client_project =======================================================================

// Get real Work day list per client, week
Project.getWorkDaysPerWeek_Client = (user_id,result) => {  
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
            data = getWorkDaysPerWeek(res, resWS, "client");
            result(null, {data:data});
          });  
        
      });
  }; 
  
function getWorkDaysPerWeek(res, resWS, option)
{
  
  var data = [];
  for(var i = 0; i < res.length; i++) 
  {
    var weekData = [];
    for(var j = 0; j < resWS.length; j++)       
      weekData.push({week:resWS[j].week, work_days : 0});

    var realWorkdays =[]; 
    switch(option)
    {
      case "client":
        realWorkdays = Util.getWorkDaysPerWeek(res[i].date_start, res[i].date_end, resWS, weekData);
        data.push({client_id:res[i].client_id, client_name:res[i].client_name, realWorkdays:realWorkdays});
        break;
      case "project":
        realWorkdays = Util.getWorkDaysPerWeek(res[i].planned_start_date, res[i].planned_end_date, resWS, weekData);
        data.push({project_id:res[i].project_id, project_name:res[i].project_name, realWorkdays:realWorkdays});
        break;  
      case "member":
        realWorkdays = Util.getWorkDaysPerWeek(res[i].planned_start_date, res[i].planned_end_date, resWS, weekData);
        data.push({member_id:res[i].member_id, member_name:res[i].member_name, realWorkdays:realWorkdays});
        break;  
    }        
  } 
  var removeIndexes = [];
  for(var i = 0; i < data.length; i++) 
  {
    for(var j = i + 1; j < data.length; j++)
    {
      //if client is same one, plus the work_days with work_days
      if(option == "client")
      {
        if(data[i].client_id != data[j].client_id) continue;
        if(removeIndexes.indexOf(j) == -1)
            removeIndexes.push(j);
        for(var k = 0; k < data[j].realWorkdays.length; k++)
          data[i].realWorkdays[k].work_days += data[j].realWorkdays[k].work_days;
      }
      else if(option == "project")
      {
        if(data[i].project_id != data[j].project_id) continue;
        if(removeIndexes.indexOf(j) == -1)
            removeIndexes.push(j);
        for(var k = 0; k < data[j].realWorkdays.length; k++)
          data[i].realWorkdays[k].work_days += data[j].realWorkdays[k].work_days;
      }   
      else if(option == "member")
      {
        if(data[i].member_id != data[j].member_id) continue;
        if(removeIndexes.indexOf(j) == -1)
            removeIndexes.push(j);
        for(var k = 0; k < data[j].realWorkdays.length; k++)
          data[i].realWorkdays[k].work_days += data[j].realWorkdays[k].work_days;
      }                     
    }    
  }
  var tmp_data = [...data];
  for(var k = 0; k < removeIndexes.length; k++)
    data.splice(data.indexOf(tmp_data[removeIndexes[k]]), 1);
  // //Add planned work days into data
  var plan_work_days = [];
  for(var j = 0; j < resWS.length; j++)       
      plan_work_days.push({week:resWS[j].week, work_days : resWS[j].work_on_week});

  switch(option)
  {
    case "client":
      data.splice(0, 0,{client_id:-1, client_name:"Available", realWorkdays:plan_work_days});
      break;
    case "project":
      data.splice(0, 0,{project_id:-1, project_name:"Available", realWorkdays:plan_work_days});
      break; 
    case "member":
      data.splice(0, 0,{member_id:-1, member_name:"Available", realWorkdays:plan_work_days});
      break;  
  }
  return data;
}

// Get real Work day list per client monthly
Project.getWorkDaysPerMonth_Client = (user_id,result) => {
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
          var result_data = getWorkDaysPerMonth(res, resWS, year, "client");
          result(null, {data:result_data});
        });        
    });
};

function getWorkDaysPerMonth(res, resWS, year, option)
{
  var data = [];
  var result_data = [];
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
  if(option == "client")
    result_data.splice(0, 0, {client_id:-1, client_name:"Available", realWorkdays : mwd});
  else if(option == "project")
    result_data.splice(0, 0, {project_id:-1, project_name:"Available", realWorkdays : mwd});
  else if(option == "member")
    result_data.splice(0, 0, {member_id:-1, member_name:"Available", realWorkdays : mwd});

  //===================================================== Statistic Client - Project data ====================
  for(var i = 0; i < res.length; i++) 
  {            
    var date_start, date_end;
    // var date_start = res[i].date_start;
    // var date_end = res[i].date_end;
    if(option == "client")
    {
        date_start = res[i].date_start;
        date_end = res[i].date_end;
    }
    else if(option == "project")
    {
        date_start = res[i].planned_start_date;
        date_end = res[i].planned_end_date;
    }
    else if(option == "member")
    {
        date_start = res[i].planned_start_date;
        date_end = res[i].planned_end_date;
    }

    //Split day range to days per month;
    var per_month_dates = Util.splitRangeDate(date_start, date_end);
    for(var j = 0; j < per_month_dates.length; j++)
    {
      //Calculate sum of monthly work days from day range
      var weekData = [];
      for(var k = 0; k < resWS.length; k++)       
        weekData.push({week:resWS[k].week, work_days : 0});
      
      var realWorkdays = Util.getSumWorkDaysPerMonth(per_month_dates[j].start_date, per_month_dates[j].end_date, resWS, weekData);   
      // data.push({client_id:res[i].client_id, client_name:res[i].client_name, realWorkdays : realWorkdays});               
      if(option == "client")
        data.push({client_id:res[i].client_id, client_name:res[i].client_name, realWorkdays : realWorkdays}); 
      else if(option == "project")
        data.push({project_id:res[i].project_id, project_name:res[i].project_name, realWorkdays : realWorkdays});
      else if(option == "member")
        data.push({member_id:res[i].member_id, member_name:res[i].member_name, realWorkdays : realWorkdays});
    }                   
  }     
  // console.log(data);
  var removeIndexes = [];
  for(var i = 0; i < data.length; i++) 
  {
    for(var j = i + 1; j < data.length; j++)
    {
      //if client is same one, plus the work_days with work_days
      if(option == "client")
      {
        if(data[i].client_id != data[j].client_id) continue;
        if(data[i].realWorkdays.month == data[j].realWorkdays.month)
        {
          if(removeIndexes.indexOf(j) == -1)
            removeIndexes.push(j); 
          data[i].realWorkdays.work_days += data[j].realWorkdays.work_days;
        }   
      }  
      else if(option == "project")
      {
        if(data[i].project_id != data[j].project_id) continue;
        if(data[i].realWorkdays.month == data[j].realWorkdays.month)
        {
          if(removeIndexes.indexOf(j) == -1)
            removeIndexes.push(j); 
          data[i].realWorkdays.work_days += data[j].realWorkdays.work_days;
        }   
      }
      else if(option == "member")
      {
        if(data[i].member_id != data[j].member_id) continue;
        if(data[i].realWorkdays.month == data[j].realWorkdays.month)
        {
          if(removeIndexes.indexOf(j) == -1)
            removeIndexes.push(j); 
          data[i].realWorkdays.work_days += data[j].realWorkdays.work_days;
        }   
      }   
    }            
  }
  // //remove item with same client_id and month
  var tmp_data = [...data];
  for(var k = 0; k < removeIndexes.length; k++)
    data.splice(data.indexOf(tmp_data[removeIndexes[k]]), 1);
  
  if(option == "client")
  {
    for(var i = 0; i < data.length; i++) 
      {         
        var is_new = true;        
        result_data.forEach(element => {
          if(element.client_id == data[i].client_id)
          {
            is_new = false;
            element.realWorkdays[data[i].realWorkdays.month - 1].work_days = data[i].realWorkdays.work_days;
          } 
        });
        if(is_new)
        {
          var data_default = [];  
          for(var j = 1; j <= 12; j++ )
            data_default.push({month:j, work_days:0});

          data_default[data[i].realWorkdays.month - 1].work_days = data[i].realWorkdays.work_days;
          result_data.push({client_id: data[i].client_id, client_name:data[i].client_name, realWorkdays:data_default});
        }  
      }
  }
  else if(option == "project")
  {
    for(var i = 0; i < data.length; i++) 
    {         
      var is_new = true;        
      result_data.forEach(element => {
        if(element.project_id == data[i].project_id)
        {
          is_new = false;
          element.realWorkdays[data[i].realWorkdays.month - 1].work_days = data[i].realWorkdays.work_days;
        } 
      });
      if(is_new)
      {
        var data_default = [];  
        for(var j = 1; j <= 12; j++ )
          data_default.push({month:j, work_days:0});

        data_default[data[i].realWorkdays.month - 1].work_days = data[i].realWorkdays.work_days;
        result_data.push({project_id: data[i].project_id, project_name:data[i].project_name, realWorkdays:data_default});
      }  
    }
  }
  else if(option == "member")
  {
    for(var i = 0; i < data.length; i++) 
    {         
      var is_new = true;        
      result_data.forEach(element => {
        if(element.member_id == data[i].member_id)
        {
          is_new = false;
          element.realWorkdays[data[i].realWorkdays.month - 1].work_days = data[i].realWorkdays.work_days;
        } 
      });
      if(is_new)
      {
        var data_default = [];  
        for(var j = 1; j <= 12; j++ )
          data_default.push({month:j, work_days:0});

        data_default[data[i].realWorkdays.month - 1].work_days = data[i].realWorkdays.work_days;
        result_data.push({member_id: data[i].member_id, member_name:data[i].member_name, realWorkdays:data_default});
      }  
    }
  }
  console.log(result_data);
  return result_data;
}

//==============================================================================================================================================================
// Get real Work day list per Project, week
Project.getWorkDaysPerWeek = (user_id,result) => {  
  var data = [];
  sql.query(
      "SELECT * FROM `tbl_project` where creator_id = ?", user_id, (err, res) => 
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
            data = getWorkDaysPerWeek(res, resWS, "project");
            result(null, {data:data});
          });  
        
      });
  }; 

// Get real Work day list per Project monthly
Project.getWorkDaysPerMonth = (user_id,result) => {  
sql.query(
    "SELECT * FROM `tbl_project` where creator_id = ?", user_id, (err, res) => 
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
          var result_data = getWorkDaysPerMonth(res, resWS, year,"project");          
          result(null, {data:result_data});
        });        
    });
};

Project.getWorkDaysPerWeek_Member = (creator_id, member_id,result) => {  
  var data = [];
  sql.query(
      "SELECT t.planned_start_date, t.planned_end_date, a.*, u.display_name member_name FROM (SELECT * FROM `tbl_priority_task` WHERE is_active = 1 and creator_id = ?) t, tbl_task_assign a, tbl_user u where t.task_id = a.task_id and u.user_id = a.member_id;",
      creator_id, (err, res) => 
      {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }        
        sql.query(
          "SELECT week, work_on_week, IF(work_on_week IS NULL, '', '') work_days FROM `tbl_work_setting` WHERE user_id = ?", creator_id, (err, resWS) => 
          {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }            
            data = getWorkDaysPerWeek(res, resWS, "member");
            result(null, {data:data});
          });  
        
      });
  }; 

// Get real Work day list per Project monthly
Project.getWorkDaysPerMonth_Member = (creator_id, member_id,result) => {  
sql.query(
    "SELECT t.planned_start_date, t.planned_end_date, a.*, u.display_name member_name FROM (SELECT * FROM `tbl_priority_task` WHERE is_active = 1 and creator_id = ?) t, tbl_task_assign a, tbl_user u where t.task_id = a.task_id and u.user_id = a.member_id;", creator_id, (err, res) => 
    {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      } 
      var year = new Date().getFullYear();       
      sql.query(
        "SELECT week, work_on_week, IF(work_on_week IS NULL, '', '') work_days, first_day_of_week	FROM `tbl_work_setting` WHERE user_id = ? and year = ?", [creator_id, year], (err, resWS) => 
        {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          var result_data = getWorkDaysPerMonth(res, resWS, year,"member");          
          result(null, {data:result_data});
        });        
    });
};


module.exports = Project;
