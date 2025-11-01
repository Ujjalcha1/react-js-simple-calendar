import { useEffect, useState } from "react";
import { WEEK_SHORT } from "../constant";
import type { calenderPopupProps } from "../types";
import { MONTH_NAMES } from "../utils";

const CalendarPopup = ({ date, onChange }: calenderPopupProps) => {
  const [currentDate, setCurrentDate] = useState(date);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [dates, setDates] = useState<(number | null)[]>([]);

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
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const onNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const onSelectDate = (day: number | null) => {
    if (!day) return;
    const selectedDate = new Date(currentYear, currentMonth, day);
    setCurrentDate(selectedDate);
    onChange(selectedDate);
  };

  return (
    <div className="calendar-popup p-4">
      <div className="calendar-popup-content">
        {/* Header */}
        <div className="calendar-header flex justify-between items-center">
          <div className="left-arrow-outline" onClick={onPreviousMonth} />
          <span className="font-semibold text-lg">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </span>
          <div className="right-arrow-outline" onClick={onNextMonth} />
        </div>

        {/* Weekday Header */}
        <div className="week-list grid grid-cols-7 gap-1 text-center font-semibold mt-2">
          {WEEK_SHORT.map((week, index) => (
            <div key={index}>{week}</div>
          ))}
        </div>

        <div className="date-grid grid grid-cols-7 gap-1 text-center mt-2">
          {dates.map((d, i) => {
            const date = currentDate.getDate();
            const month = currentDate.getMonth();
            return (
              <div
                key={i}
                className={`${
                  month === currentMonth && date === d
                    ? "active-date"
                    : "calendar-date"
                }`}
                onClick={() => onSelectDate(d)}
              >
                {d ? d : ""}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarPopup;
