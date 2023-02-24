function convertStringToDate(date) {
  date = String(date).split(" ");
  let days = String(date[0]).split("-");
  let hours = String(date[1]).split(":");
  return [
    parseInt(days[0]),
    parseInt(days[1]),
    parseInt(days[2]),
    parseInt(hours[0]),
    parseInt(hours[1]),
    parseInt(hours[2]),
  ];
}

export const isEqualDays = (savedDate, currentDate) => {
  const savedTime = convertStringToDate(savedDate);
  const currentTime = convertStringToDate(currentDate);
  return (
    savedTime[0] === currentTime[0] &&
    savedTime[1] === currentTime[1] &&
    savedTime[2] === currentTime[2]
  );
};

export const GetCurrentDateTime = () => {
  const date = new Date();
  const showTime =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
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

const getDateString = (date) => {
  if(date < 10)
    return "0" + String(date)
  else
    return String(date)
}

export const GetCurrentDateTimeDB = () => {
  const date = new Date();
  const showTime =
    String(date.getFullYear()) + getDateString(date.getMonth() + 1) + getDateString(date.getDate());
  return showTime;
};

export const GetDateTimeDB = (date) => {
  const showTime =
    String(date.slice(0, 4)) + "/" + String(date.slice(4, 6)) + "/" + String(date.slice(6, 8));
  return showTime;
};

export const convertStringToDateDB = (date, userId) => {
  date = String(date).split("/");
  return String(date[0]) + String(date[1]) + String(date[2]) + String(userId)
}

