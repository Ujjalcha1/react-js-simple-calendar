import AdvanceCalendar from "./AdvanceCalendar";
import DefaultCalendar from "./DefaultCalendar";
import { calenderPopupProps } from "./types";

const CalendarPopup = ({
  date,
  onChange,
  theme,
  maxDate,
  minDate,
  mode,
  minYear,
  maxYear,
}: calenderPopupProps) => {
  return mode === "default" ? (
    <DefaultCalendar
      onChange={onChange}
      date={date}
      theme={theme}
      maxDate={maxDate}
      minDate={minDate}
    />
  ) : mode === "advanced" ? (
    <AdvanceCalendar
      onChange={onChange}
      date={date}
      theme={theme}
      maxDate={maxDate}
      minDate={minDate}
      minYear={minYear}
      maxYear={maxYear}
    />
  ) : null;
};

export default CalendarPopup;
