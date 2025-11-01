import { useEffect, useRef, useState } from "react";
import type { calenderProps } from "../types";
import CalendarPopup from "./CalendarPopup";
import { formatDate } from "../utils";

export const Calendar = ({
  style,
  className,
  leftIcon,
  rightIcon,
  format,
  date = new Date(),
}: calenderProps) => {
  const [newDate, setNewDate] = useState(date);
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const togglePopup = () => setIsOpen((prev) => !prev);

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
      className={`calender${className ? ` ${className}` : ""}`}
      style={style}
      ref={popupRef}
    >
      {leftIcon ? <div style={{ width: "10%" }}>{leftIcon}</div> : null}
      <div style={{ width: leftIcon ? "80%" : "90%" }}>
        <span>{formatDate(newDate, format)}</span>
      </div>
      <div style={{ width: "10%" }} onClick={togglePopup}>
        {rightIcon ?? <div className="down-arrow-outline" />}
      </div>

      {isOpen && <CalendarPopup date={newDate} onChange={onChange} />}
    </div>
  );
};
