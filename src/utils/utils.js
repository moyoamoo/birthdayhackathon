export function unixToDate(unix) {
  if (!unix) {
    console.log("unix is undefined");
    return "unknown date";
  }
  const date = new Date(unix); //converts unix back to object
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
  return formattedDate;
}
