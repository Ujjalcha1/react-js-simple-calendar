import { useEffect, useRef, useState } from "react";
import { MONTH_NAMES_LIST, WEEK_SHORT } from "./Constant";
import { calenderPopupProps } from "./types";
import { generateYears, MONTH_NAMES } from "./Utils";

const CalendarPopup = ({
  date,
  onChange,
  mode = "light",
  maxDate,
  minDate,
}: calenderPopupProps) => {
  const [currentDate, setCurrentDate] = useState(date);
  const [currentYear, setCurrentYear] = useState(new Date(date)?.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date(date)?.getMonth());
  const [dates, setDates] = useState<(number | null)[]>([]);
  const [openYearList, setOpenYearList] = useState<boolean>(false);
  const [openMonthList, setOpenMonthList] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const monthRef = useRef<HTMLDivElement | null>(null);
  const years = generateYears();

  const min = minDate ? new Date(minDate) : null;
  const max = maxDate ? new Date(maxDate) : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setOpenYearList(false);
      }
      if (
        monthRef.current &&
        !monthRef.current.contains(event.target as Node)
      ) {
        setOpenMonthList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday, 6 = Saturday
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    const tempDates: (number | null)[] = [];

    // Push nulls before the first day
    for (let i = 0; i < firstDay; i++) {
      tempDates.push(null);
    }

    // Push all actual dates
    for (let d = 1; d <= lastDate; d++) {
      tempDates.push(d);
    }

    setDates(tempDates);
  }, [currentMonth, currentYear]);

  const onPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev: number) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev: number) => prev - 1);
    }
  };

  const onNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev: number) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev: number) => prev + 1);
    }
  };

  const onSelectDate = (day: number | null) => {
    if (!day) return;
    const selectedDate = new Date(currentYear, currentMonth, day);

    if (min && selectedDate < min) return;
    if (max && selectedDate > max) return;

    setCurrentDate(selectedDate);
    onChange(selectedDate);
  };

  const isPrevDisabled = () => {
    if (!min) return false;
    const prevMonth = new Date(currentYear, currentMonth - 1, 1);
    return prevMonth < new Date(min.getFullYear(), min.getMonth(), 1);
  };

  const isNextDisabled = () => {
    if (!max) return false;
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    return nextMonth > new Date(max.getFullYear(), max.getMonth(), 1);
  };

  return (
    <div
      className={`rjsc-calendar-popup p-4  ${
        mode === "light"
          ? "rjsc-calendar-popup-light"
          : "rjsc-calendar-popup-dark"
      }`}
    >
      <div className="rjsc-rjsc-calendar-popup-content">
        <div className="rjsc-calendar-header flex justify-between items-center">
          {!openYearList && !openMonthList ? (
            <div
              className={`rjsc-left-arrow-outline ${
                isPrevDisabled() ? "rjsc-disabled" : ""
              } ${
                mode === "light"
                  ? "rjsc-left-arrow-outline-light"
                  : "rjsc-left-arrow-outline-dark"
              }`}
              onClick={!isPrevDisabled() ? onPreviousMonth : undefined}
            />
          ) : (
            <div className={`rjsc-blank-arrow`} />
          )}

          <div
            style={{
              width: "33%",
              display: "flex",
              justifyContent: " space-between",
            }}
          >
            <span
              className={`font-semibold text-lg ${
                mode === "light"
                  ? "rjsc-month-name-light"
                  : "rjsc-month-name-dark"
              }`}
              style={{ padding: "3px", cursor: "pointer" }}
              onClick={() => setOpenMonthList(!openMonthList)}
            >
              {MONTH_NAMES[currentMonth]}
            </span>
            <span
              className={`font-semibold text-lg  ${
                mode === "light"
                  ? "rjsc-month-name-light"
                  : "rjsc-month-name-dark"
              }`}
              style={{ padding: "3px", cursor: "pointer" }}
              onClick={() => setOpenYearList(!openYearList)}
            >
              {currentYear}
            </span>
          </div>

          {!openYearList && !openMonthList ? (
            <div
              className={`rjsc-right-arrow-outline ${
                isNextDisabled() ? "rjsc-disabled" : ""
              } ${
                mode === "light"
                  ? "rjsc-right-arrow-outline-light"
                  : "rjsc-right-arrow-outline-dark"
              }`}
              onClick={!isNextDisabled() ? onNextMonth : undefined}
            />
          ) : (
            <div className={`rjsc-blank-arrow`} />
          )}
        </div>

        {openYearList ? (
          <div ref={listRef} className={`rjsc-year-list `}>
            {years.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    String(item) === String(currentYear)
                      ? "rjsc-active-year"
                      : ""
                  }`}
                  onClick={() => setCurrentYear(item)}
                >
                  <p className={``}>{item}</p>
                </div>
              );
            })}
          </div>
        ) : openMonthList ? (
          <div ref={monthRef} className={`rjsc-year-list `}>
            {MONTH_NAMES_LIST.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    String(item.label) === String(currentMonth)
                      ? "rjsc-active-year"
                      : ""
                  }`}
                  onClick={() => setCurrentMonth(item.value)}
                >
                  <p className={``}>{item.label}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className="rjsc-week-list grid grid-cols-7 gap-1 text-center font-semibold mt-2">
              {WEEK_SHORT.map((week, index) => (
                <div className="rjsc-weeks" key={index}>
                  {week}
                </div>
              ))}
            </div>
            <div className="rjsc-date-grid grid grid-cols-7 gap-1 text-center mt-2">
              {dates.map((d: any, i) => {
                const isCurrentDate =
                  currentDate &&
                  currentDate.getMonth() === currentMonth &&
                  currentDate.getFullYear() === currentYear &&
                  currentDate.getDate() === d;
                const dateObj = new Date(currentYear, currentMonth, d);
                const isSunday = dateObj.getDay() === 0;
                const isDisabled =
                  (min && dateObj < min) || (max && dateObj > max);
                return (
                  <div
                    key={i}
                    className={`${
                      isCurrentDate ? "rjsc-active-date" : "rjsc-calendar-date"
                    } ${
                      mode === "light"
                        ? "rjsc-calendar-date-light"
                        : "rjsc-calendar-date-dark"
                    } ${isSunday ? "rjsc-sunday" : ""}`}
                    style={{
                      cursor: isDisabled ? "not-allowed" : "pointer",
                      opacity: isDisabled ? 0.4 : 1,
                    }}
                    onClick={() => onSelectDate(d)}
                  >
                    {d ?? ""}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CalendarPopup;
