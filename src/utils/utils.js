export const unixToDate = (unix) => {
  if (!unix) {
    console.log("unix is undefined");
    return "unknown date";
  }
  const date = new Date(unix); //converts unix back to object
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
  return formattedDate;
};

export const stringToUnix = (date) => {
  let _date = date.split("-");
  _date = new Date(_date[0], _date[1] - 1, _date[2]);
  return _date.getTime();
};
