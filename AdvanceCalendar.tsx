import { useEffect, useMemo, useRef, useState } from "react";
import { WEEK_SHORT } from "./Constant";
import { calenderPopupProps } from "./types";
import { formatDate, generateYears, MONTH_NAMES } from "./Utils";

const AdvanceCalendar = ({
  date,
  onChange,
  theme = "light",
  maxDate,
  minDate,
  minYear = new Date().getFullYear(),
  maxYear = new Date().getFullYear() + 70,
}: calenderPopupProps) => {
  const [currentDate, setCurrentDate] = useState(date);
  const [currentYear, setCurrentYear] = useState(new Date(date)?.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date(date)?.getMonth());
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const monthRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const years = generateYears(Number(minYear), Number(maxYear));

  const fullCalendar = useMemo(() => {
    return years.map((year) => {
      const months = MONTH_NAMES.map((month, monthIndex) => {
        const firstDay = new Date(year, monthIndex, 1).getDay();
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const blanks = Array(firstDay).fill(null);
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        return { name: month, days: [...blanks, ...days] };
      });
      return { year, months };
    });
  }, [years]);

  const onPrevious = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setCurrentDate(new Date(newYear, newMonth, 1));
  };

  const onNext = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setCurrentDate(new Date(newYear, newMonth, 1));
  };

  useEffect(() => {
    const key = `${currentYear}-${currentMonth}`;
    const monthEl = monthRefs.current[key];
    if (monthEl && calendarContainerRef.current) {
      monthEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [currentYear, currentMonth]);

  return (
    <div className="rjsc-advance-calendar-popup p-4">
      <div
        className={`rjsc-advance-calendar-popup-content ${
          theme === "dark" ? "rjsc-advance-calendar-popup-content-dark" : ""
        }`}
      >
        <div
          className={`rjsc-sticky-header ${
            theme === "dark" ? "rjsc-sticky-header-dark" : ""
          }`}
        >
          <div className="rjsc-input-box">
            <input
              className={`rjsc-input ${
                theme === "dark" ? "rjsc-input-dark" : ""
              }`}
              value={formatDate(currentDate, "MMM DD, YYYY")}
              readOnly
            />
            <div className="rjsc-left-right-group">
              <div
                className={`rjsc-left-arrow-outline cursor-pointer ${
                  theme === "dark" ? "rjsc-left-arrow-outline-dark" : ""
                }`}
                onClick={onPrevious}
              />
              <div
                className={`rjsc-right-arrow-outline cursor-pointer ${
                  theme === "dark" ? "rjsc-right-arrow-outline-dark" : ""
                }`}
                onClick={onNext}
              />
            </div>
          </div>

          {/* ===== Week Headers ===== */}
          <div className="rjsc-week-list-sticky grid grid-cols-7 text-center font-semibold mt-2">
            {WEEK_SHORT.map((week, index) => (
              <div key={index} className="rjsc-weeks">
                {week}
              </div>
            ))}
          </div>
        </div>

        {/* ===== Year → Month → Dates ===== */}
        <div
          ref={calendarContainerRef}
          className={`rjsc-advance-calendar-year-section mt-2 overflow-y-auto max-h-[240px] px-1 ${theme}`}
        >
          {fullCalendar.map((year) => (
            <div key={year.year} className="rjsc-year-block mb-6">
              <div className="rjsc-months grid grid-cols-2 gap-3">
                {year.months.map((month, monthIndex) => (
                  <div
                    key={monthIndex}
                    ref={(el: any) =>
                      (monthRefs.current[`${year.year}-${monthIndex}`] = el)
                    }
                    className="rjsc-month-block bg-[#fafafa] rounded-lg p-2 shadow-sm"
                  >
                    <h3
                      className={`rjsc-month-year ${
                        theme === "dark" ? "rjsc-month-year-dark" : ""
                      }`}
                    >
                      {month.name} {year.year}
                    </h3>

                    <div className="rjsc-date-grid grid grid-cols-7 gap-1 text-center">
                      {month.days.map((day, dayIndex) => {
                        if (!day)
                          return (
                            <div
                              key={dayIndex}
                              className="rjsc-calendar-date opacity-0 pointer-events-none"
                            />
                          );

                        const dateObj = new Date(year.year, monthIndex, day);
                        const isSunday = dateObj.getDay() === 0;
                        const isCurrentDate =
                          currentDate &&
                          currentDate.getFullYear() === year.year &&
                          currentDate.getMonth() === monthIndex &&
                          currentDate.getDate() === day;
                        const isDisabled =
                          (minDate && dateObj < new Date(minDate)) ||
                          (maxDate && dateObj > new Date(maxDate));

                        return (
                          <div
                            onClick={() => {
                              if (isDisabled) return;
                              setCurrentDate(dateObj);
                              onChange(dateObj);
                            }}
                            key={dayIndex}
                            className={`rjsc-calendar-date
                               ${isDisabled ? "rjsc-disabled" : ""}
    ${
      isSunday && isCurrentDate
        ? "rjsc-sunday-active"
        : isSunday
        ? "rjsc-sunday"
        : theme === "dark"
        ? "rjsc-calendar-date-dark"
        : "rjsc-calendar-date-light"
    }
    ${!isSunday && isCurrentDate ? "rjsc-active-date" : ""}
  `}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvanceCalendar;
