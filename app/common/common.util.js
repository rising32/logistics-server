
module.exports.getWeekNumber = function  getWeekNumber(date) {  
  return getWN(date);
};

function getWN(date){
  var oneJan = new Date(date.getFullYear(),0,1);
  var numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  week = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);
  return week;
}

module.exports.getWorkDaysPerWeek = function getWorkDaysPerWeek(start_date, end_date, res)
{
  var weekWorkday = [];  
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
          weekWorkday.push({week:weekFirst, workdays:remindWorkdays});
      }
      else if(res[i].week > weekFirst && res[i].week < weekEnd)
      {
        weekWorkday.push({week:res[i].week, workdays:res[i].work_on_week});
        console.log(res[i].work_on_week);
      }    
      else
      {              
        weekWorkday.push({week:weekEnd, workdays:weekdayEnd});
        break;
      }
    }      
  }
  return weekWorkday;  
}