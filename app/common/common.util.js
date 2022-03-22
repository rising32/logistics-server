module.exports.getWeekNumber = function  getWeekNumber(date) {
  var oneJan = new Date(date.getFullYear(),0,1);
  var numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  week = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);
  return week;
};