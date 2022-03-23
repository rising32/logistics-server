
module.exports.getWeekNumber = function  getWeekNumber(date) {  
  return getWN(date);
};

function getWN(date){  
  var d = new Date(+date);
  d.setHours(0,0,0);
  d.setDate(d.getDate()+4-(d.getDay()||7));
  return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
}

function getWorkDaysWeek(start_date, end_date, resData, weekData)
{
  var wd = [...weekData];
  var res = [...resData];
  console.log(res);
  var weekFirst = getWN(new Date(start_date));
  var weekEnd = getWN(new Date(end_date));
  var weekdayFirst = new Date(start_date).getDay();
  var weekdayEnd = new Date(end_date).getDay();
  
  for(var i = 0; i < res.length; i++)
  {          
    if(res[i].week >= weekFirst && res[i].week <= weekEnd)
    {            
      if(res[i].week == weekFirst)
      {              
          var remindWorkdays = res[i].work_on_week - weekdayFirst + 1;
          wd[i].work_days = remindWorkdays;    
      }
      else if(res[i].week > weekFirst && res[i].week < weekEnd)
      {
        wd[i].work_days = res[i].work_on_week;  
      }    
      else
      {  
        if(weekdayEnd <= res[i].work_on_week)
        wd[i].work_days = weekdayEnd;
        else
        wd[i].work_days = res[i].work_on_week;
        break;
      }
    }      
  }
  return wd;
}

module.exports.getWorkDaysPerWeek = function getWorkDaysPerWeek(start_date, end_date, res, weekData)
{
  return getWorkDaysWeek(start_date, end_date, res, weekData);  
}

module.exports.getSumWorkDaysPerMonth = function getSumWorkDaysPerMonth(start_date, end_date, res, weekData)
{
  var work_days_list = getWorkDaysWeek(start_date, end_date, res, weekData);
  // console.log(work_days_list);
  var month = new Date(start_date).getMonth() + 1;
  var work_sum = 0;
  work_days_list.forEach(week_work => {    
    work_sum += week_work.work_days;
  });

  return {month: month, work_days:work_sum};
}

function getDateList(startDate, endDate)
{
  var start_date = new Date(startDate);
  var end_date = new Date(endDate);
  var dates = [start_date];
  var date = new Date(startDate);
  while(date < end_date)
  {
      // Add a day
      var dt = new Date(date.setDate(date.getDate() + 1));
      dates.push(dt);
  }  
  return dates;
}

module.exports.splitRangeDate = function splitRangeDate(startDate, endDate)
{ 
  var dts = getDateList(startDate, endDate);
  var month = new Date(dts[0]).getMonth();
  var monthArray = [];
  var id = 0;
  monthArray.push({month:month + 1, days:id, start_date: dts[0], end_date:null});
  for(var i = 0; i < dts.length; i++)
  {    
    var dt = new Date(dts[i]);
    if(dt.getMonth() > month)
    {
      if(id > 0 && monthArray.length > 0)
      {
        monthArray[monthArray.length - 1].days = id;
        monthArray[monthArray.length - 1].end_date = dts[i - 1];
      }  
      month = dt.getMonth();
      id = 0;      
      monthArray.push({month:month + 1, days:id, start_date: dts[i], end_date:null});
    }  
    if(dt.getMonth() == month)
    {
      id++;
    }
  }
  monthArray[monthArray.length - 1].days = id;
  monthArray[monthArray.length - 1].end_date = new Date(endDate);
  console.log(monthArray);
  return monthArray;
}
