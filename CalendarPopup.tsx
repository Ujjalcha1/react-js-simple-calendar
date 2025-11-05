import { useEffect, useState } from "react";
import { WEEK_SHORT } from "./Constant";
import { calenderPopupProps } from "./types";
import { MONTH_NAMES } from "./Utils";

const CalendarPopup = ({ date, onChange }: calenderPopupProps) => {
  const [currentDate, setCurrentDate] = useState(date);
  const [currentYear, setCurrentYear] = useState(new Date(date).getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date(date).getMonth());
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
    setCurrentDate(selectedDate);
    onChange(selectedDate);
  };

  return (
    <div className="rjsc-calendar-popup p-4">
      <div className="rjsc-rjsc-calendar-popup-content">
        {/* Header */}
        <div className="rjsc-calendar-header flex justify-between items-center">
          <div className="rjsc-left-arrow-outline" onClick={onPreviousMonth} />
          <span className="font-semibold text-lg">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </span>
          <div className="rjsc-right-arrow-outline" onClick={onNextMonth} />
        </div>

        {/* Weekday Header */}
        <div className="rjsc-week-list grid grid-cols-7 gap-1 text-center font-semibold mt-2">
          {WEEK_SHORT.map((week, index) => (
            <div key={index}>{week}</div>
          ))}
        </div>

        <div className="rjsc-date-grid grid grid-cols-7 gap-1 text-center mt-2">
          {dates.map((d, i) => {
            const isCurrentDate =
              currentDate &&
              currentDate.getMonth() === currentMonth &&
              currentDate.getFullYear() === currentYear &&
              currentDate.getDate() === d;

            return (
              <div
                key={i}
                className={
                  isCurrentDate ? "rjsc-active-date" : "rjsc-calendar-date"
                }
                onClick={() => onSelectDate(d)}
              >
                {d ?? ""}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarPopup;
