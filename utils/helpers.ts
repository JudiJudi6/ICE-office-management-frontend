export function convertTo12HourFormat(time24: number) {
  let hour = time24;

  const period = hour >= 12 ? "PM" : "AM";

  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }

  return `${hour}:00 ${period}`;
}

export const formatDateTo12Hour = (date: Date) => {
  let dateDay = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const formattedDay = dateDay < 10 ? "0" + dateDay : dateDay;
  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + formattedMinutes + " " + ampm;

  const createdAt = formattedDate + " " + strTime;
  return createdAt;
};
