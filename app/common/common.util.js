function getWeekNumber(date)
{
  //currentdate = new Date();
  var oneJan = new Date(currentdate.getFullYear(),0,1);
  var numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  var result = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);
  console.log(`The week number of the current date (${date}) is ${result}.`);
  return result;
}