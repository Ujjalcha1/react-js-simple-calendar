import { useEffect, useMemo, useState } from "react";
import { WEEK_SHORT } from "./Constant";
import { calenderPopupProps, YearData } from "./types";
import { generateYears, MONTH_NAMES } from "./Utils";

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
  const [dates, setDates] = useState<(number | null)[]>([]);
  // const [fullCalendar, setFullCalendar] = useState<YearData[]>([]);

  const years = generateYears(Number(minYear), Number(maxYear));

  // useEffect(() => {
  //   const calendarData = years.map((year) => {
  //     const months = MONTH_NAMES.map((month, monthIndex) => {
  //       const firstDay = new Date(year, monthIndex, 1).getDay();
  //       const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  //       const blanks = Array(firstDay).fill(null);
  //       const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  //       const allDays = [...blanks, ...days];
  //       return { name: month, days: allDays };
  //     });

  //     return { year, months };
  //   });

  //   setFullCalendar(calendarData);
  // }, []);

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

  return (
    <div className="rjsc-advance-calendar-popup p-4">
      <div className="rjsc-advance-calendar-popup-content">
        {/* ===== Input Header ===== */}
        <div className={`rjsc-sticky-header`}>
          <div className="rjsc-input-box">
            <input className="rjsc-input" value="NOV 1, 2025" readOnly />
            <div className="rjsc-left-right-group">
              <div className="rjsc-left-arrow-outline" />
              <div className="rjsc-right-arrow-outline" />
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
        <div className="rjsc-advance-calendar-year-section mt-2 overflow-y-auto max-h-[240px] px-1">
          {fullCalendar.map((year, yearIndex) => (
            <div key={yearIndex} className="rjsc-year-block mb-6">
              <h2 className="text-center text-sm font-bold text-gray-700 mb-3">
                {year.year}
              </h2>

              <div className="rjsc-months grid grid-cols-2 gap-3">
                {year.months.map((month, monthIndex) => {
                  return (
                    <div
                      key={monthIndex}
                      className="rjsc-month-block bg-[#fafafa] rounded-lg p-2 shadow-sm"
                    >
                      <h3 className="text-center text-xs font-semibold text-gray-600 mb-1">
                        {month.name}
                      </h3>

                      <div className="rjsc-date-grid grid grid-cols-7 gap-1 text-center">
                        {month.days.map((day, dayIndex) => {
                          const isSunday = dayIndex % 7 === 0;

                          return (
                            <div
                              key={dayIndex}
                              className={`rjsc-calendar-date ${
                                !day
                                  ? "opacity-0 pointer-events-none"
                                  : isSunday
                                  ? "rjsc-sunday"
                                  : "rjsc-calendar-date-light"
                              }`}
                            >
                              {day || ""}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvanceCalendar;
