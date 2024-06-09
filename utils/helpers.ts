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
