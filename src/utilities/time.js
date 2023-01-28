function convertStringToDate(date){
  date = String(date).split(' ');
  let days = String(date[0]).split('/');
  let hours = String(date[1]).split(':');
  return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
}

export const isEqualDays = (date1, date2) => {
  const time1 = convertStringToDate(date1);
  const time2 = convertStringToDate(date2);
  return !!(time1[0] === time2[0] && time1[1] === time2[1] && time1[2] === time2[2]);
}

export const GetCurrentDateTime = () => {
  const date = new Date();
  const showTime =
    date.getFullYear() +
    "/" +
    date.getMonth() +
    "/" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  return showTime;
};

export const GetCurrentDateTimeForFileName = () => {
  const date = new Date();
  const showTime =
    date.getFullYear() +
    "-" +
    date.getMonth() +
    "-" +
    date.getDate() +
    "-" +
    date.getHours() +
    "-" +
    date.getMinutes();
  return showTime;
};


