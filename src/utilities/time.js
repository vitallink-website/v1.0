export const GetCurrectDateTime = () => {
  const date = new Date();
  const showTime =
    date.getFullYear() +
    " " +
    date.getMonth() +
    " " +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  return showTime;
};
