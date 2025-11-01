import { END_YEAR, START_YEAR } from "../constant";

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

const MONTH_SHORT_NAMES = [
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

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WEEKDAY_SHORT_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getOrdinal = (n: number) => {
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

export const genarateYearList = () => {
  let result = [];
  {
    for (let index = START_YEAR; index <= END_YEAR; index++) {
      result.push(index);
    }
  }
  return result;
};

export const formatDate = (
  date: Date,
  format: string = "DD/MM/YYYY" // default changed
): string => {
  const d = date;

  const map: Record<string, string | number> = {
    YYYY: d.getFullYear(),
    YY: String(d.getFullYear()).slice(-2),
    MMMM: MONTH_NAMES[d.getMonth()],
    MMM: MONTH_SHORT_NAMES[d.getMonth()],
    MM: String(d.getMonth() + 1).padStart(2, "0"),
    M: d.getMonth() + 1,
    DD: String(d.getDate()).padStart(2, "0"),
    D: d.getDate(),
    Do: `${d.getDate()}${getOrdinal(d.getDate())}`,
    dddd: WEEKDAY_NAMES[d.getDay()],
    ddd: WEEKDAY_SHORT_NAMES[d.getDay()],
    HH: String(d.getHours()).padStart(2, "0"),
    H: d.getHours(),
    hh: String(d.getHours() % 12 || 12).padStart(2, "0"),
    h: d.getHours() % 12 || 12,
    mm: String(d.getMinutes()).padStart(2, "0"),
    m: d.getMinutes(),
    ss: String(d.getSeconds()).padStart(2, "0"),
    s: d.getSeconds(),
    A: d.getHours() >= 12 ? "PM" : "AM",
    a: d.getHours() >= 12 ? "pm" : "am",
  };

  // Sort keys by length descending to avoid partial replacements
  const tokens = Object.keys(map).sort((a, b) => b.length - a.length);

  let formatted = format;

  tokens.forEach((token) => {
    const regex = new RegExp(token, "g");
    formatted = formatted.replace(regex, String(map[token]));
  });

  return formatted;
};
