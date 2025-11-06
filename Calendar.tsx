import { useEffect, useRef, useState } from "react";
import CalendarPopup from "./CalendarPopup";
import { calenderProps } from "./types";
import { formatDate } from "./Utils";

const Calendar = ({
  style,
  className,
  leftIcon,
  rightIcon,
  format,
  date = new Date(),
  mode = "light",
  minDate,
  maxDate,
}: calenderProps) => {
  const [newDate, setNewDate] = useState<Date>(date);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const togglePopup = () => setIsOpen((prev: boolean) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onChange = (date: Date) => {
    setNewDate(date);
  };

  return (
    <div
      className={`rjsc-calendar ${className ? ` ${className}` : ""} ${
        mode === "light" ? "rjsc-calendar-light" : "rjsc-calendar-dark"
      }`}
      style={style}
      ref={popupRef}
    >
      {leftIcon ? (
        <div
          className={`${
            mode === "light" ? "rjsc-left-light" : "rjsc-left-dark"
          }`}
          style={{ width: "10%" }}
        >
          {leftIcon}
        </div>
      ) : null}
      <div style={{ width: leftIcon ? "80%" : "90%" }}>
        <span
          className={`${
            mode === "light" ? "rjsc-date-light" : "rjsc-date-dark"
          }`}
        >
          {formatDate(newDate, format)}
        </span>
      </div>
      <div style={{ width: "10%" }} onClick={togglePopup}>
        {rightIcon ?? (
          <div
            className={`rjsc-down-arrow-outline ${
              mode === "light"
                ? "rjsc-down-arrow-outline-light"
                : "rjsc-down-arrow-outline-dark"
            }`}
          />
        )}
      </div>

      {isOpen && (
        <CalendarPopup
          date={newDate}
          onChange={onChange}
          mode={mode}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    </div>
  );
};

export default Calendar;
