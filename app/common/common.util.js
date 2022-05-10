
module.exports.getWeekNumber = function  getWeekNumber(date) {  
  return getWN(date);
};

function getWN(date){  
  var d = new Date(+date);
  d.setHours(0,0,0);
  d.setDate(d.getDate()+4-(d.getDay()||7));
  return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
}

function getWorkDaysWeek(start_date, end_date, res, wd)
{
  var weekFirst = getWN(new Date(start_date));
  var weekEnd = getWN(new Date(end_date));
  var weekdayFirst = new Date(start_date).getDay();
  var weekdayEnd = new Date(end_date).getDay();
  var tmpDt = new Date(null);
  if(start_date == null || end_date == null || start_date <= tmpDt || end_date <= tmpDt)
    return wd;
  
  for(var i = 0; i < res.length; i++)
  {          
    if(res[i].week >= weekFirst && res[i].week <= weekEnd)
    {            
      if(res[i].week == weekFirst)
      { 
        if(weekdayFirst == 0 || weekdayFirst == 6)
          wd[i].work_days = 0;
        else 
          wd[i].work_days = res[i].work_on_week - weekdayFirst + 1;
      }
      else if(res[i].week > weekFirst && res[i].week < weekEnd)
      {
        wd[i].work_days = res[i].work_on_week;  
      }    
      else
      {  
        if(weekdayEnd <= res[i].work_on_week && weekdayEnd != 0)
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
  // console.log({startDate, endDate});
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
  return monthArray;
}

module.exports.getDateByWeek = function getDateOfWeek(w, y) {

  const sunday = new Date(y, 0, (1 + w * 7));
  while (sunday.getDay() !== 1) {
    sunday.setDate(sunday.getDate() - 1);
  }
  const saturday = new Date(y, 0, (2 + w * 7));
  var d1 = sunday.toISOString().split("T")[0];
  var d2 = saturday.toISOString().split("T")[0];
  return {d1:d1, d2: d2};
}

//==================================================== File ===============================================================
// Upload file
module.exports.uploadFile = async (req, res) => {
  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let avatar = req.files.avatar;
        
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        avatar.mv('./uploads/' + avatar.name);

        //send response
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: avatar.name,
                mimetype: avatar.mimetype,
                size: avatar.size
            }
        });
    }
  } catch (err) {
      res.status(500).send(err);
  }
};

// Upload Multi files
module.exports.uploadMultiFiles = async (req, res) => {
  try {    
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        let data = []; 

        //loop all files
        req.files.photos.forEach(photo => {
          photo.mv('./uploads/' + photo.name);

            //push file details
            data.push({
                name: photo.name,
                mimetype: photo.mimetype,
                size: photo.size
            });
        });
        //return response
        res.send({
            status: true,
            message: 'Files are uploaded',
            data: data
        });
    }
  } catch (err) {
      res.status(500).send(err);
  }
};
