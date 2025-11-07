import { END_YEAR, START_YEAR } from "./Constant";

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MONTH_SHORT_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const WEEKDAY_SHORT_NAMES = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export const getOrdinal = (n: number): string => {
  if (n > 3 && n < 21) return "th";
  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const generateYears = (
  startYear = START_YEAR,
  endYear = END_YEAR
): number[] => {
  const result: number[] = [];
  for (let index = startYear; index <= endYear; index++) {
    result.push(index);
  }
  return result;
};

export const formatDate = (
  date: Date,
  format: string = "DD/MM/YYYY"
): string => {
  const map: Record<string, string | number> = {
    YYYY: date.getFullYear(),
    YY: String(date.getFullYear()).slice(-2),
    MMMM: MONTH_NAMES[date.getMonth()],
    MMM: MONTH_SHORT_NAMES[date.getMonth()],
    MM: String(date.getMonth() + 1).padStart(2, "0"),
    M: date.getMonth() + 1,
    DD: String(date.getDate()).padStart(2, "0"),
    D: date.getDate(),
    Do: `${date.getDate()}${getOrdinal(date.getDate())}`,
    dddd: WEEKDAY_NAMES[date.getDay()],
    ddd: WEEKDAY_SHORT_NAMES[date.getDay()],
    HH: String(date.getHours()).padStart(2, "0"),
    H: date.getHours(),
    hh: String(date.getHours() % 12 || 12).padStart(2, "0"),
    h: date.getHours() % 12 || 12,
    mm: String(date.getMinutes()).padStart(2, "0"),
    m: date.getMinutes(),
    ss: String(date.getSeconds()).padStart(2, "0"),
    s: date.getSeconds(),
    A: date.getHours() >= 12 ? "PM" : "AM",
    a: date.getHours() >= 12 ? "pm" : "am",
  };

  const tokenRegex = new RegExp(
    Object.keys(map)
      .sort((a, b) => b.length - a.length)
      .join("|"),
    "g"
  );

  return format.replace(tokenRegex, (matched) => String(map[matched]));
};
