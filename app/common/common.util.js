
module.exports.getWeekNumber = function  getWeekNumber(date) {  
  return getWN(date);
};

function getWN(date){  
  var d = new Date(+date);
  d.setHours(0,0,0);
  d.setDate(d.getDate()+4-(d.getDay()||7));
  return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
}

module.exports.getWorkDaysPerWeek = function getWorkDaysPerWeek(start_date, end_date, res, weekData)
{
  var weekFirst = getWN(new Date(start_date));
  var weekEnd = getWN(new Date(end_date));
  var weekdayFirst = new Date(start_date).getDay();
  var weekdayEnd = new Date(end_date).getDay();  
  // console.log(weekFirst);
  // console.log(start_date);
  
  for(var i = 0; i < res.length; i++)
  {          
    if(res[i].week >= weekFirst && res[i].week <= weekEnd)
    {            
      if(res[i].week == weekFirst)
      {              
          var remindWorkdays = res[i].work_on_week - weekdayFirst + 1;
          weekData[i].work_days = remindWorkdays;    
      }
      else if(res[i].week > weekFirst && res[i].week < weekEnd)
      {
        weekData[i].work_days = res[i].work_on_week;  
      }    
      else
      {  
        if(weekdayEnd <= res[i].work_on_week)
          weekData[i].work_days = weekdayEnd;
        else
          weekData[i].work_days = res[i].work_on_week;
        break;
      }
    }      
  }
  // console.log(weekData);
  return weekData;  
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
  monthArray.push({month:month, days:id});
  for(var i = 0; i < dts.length; i++)
  {    
    var dt = new Date(dts[i]);
    if(dt.getMonth() > month)
    {
      if(id > 0 && monthArray.length > 0)
        monthArray[monthArray.length - 1].days = id;
      month = dt.getMonth();
      id = 0;      
      monthArray.push({month:month, days:id});
    }  
    if(dt.getMonth() == month)
    {
      id++;console.log(id);
    }
  }
  monthArray[monthArray.length - 1].days = id;
  console.log(monthArray);
  return dts;
}
