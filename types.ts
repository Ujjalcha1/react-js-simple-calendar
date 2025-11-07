import type React from "react";

export type calenderProps = {
  style?: React.CSSProperties;
  className?: string;
  leftIcon?: any;
  rightIcon?: any;
  format?: string;
  date?: any;
  theme?: "light" | "dark";
  minDate?: Date;
  maxDate?: Date;
  mode?: "default" | "advanced";
  minYear?: string | number;
  maxYear?: string | number;
};

export type calenderPopupProps = {
  date?: any;
  onChange: (val: Date) => void;
  theme?: "light" | "dark";
  minDate?: Date;
  maxDate?: Date;
  mode?: "default" | "advanced";
  minYear?: string | number;
  maxYear?: string | number;
};

export type indexProps = {
  className?: string;
  date?: string;
  format?: string;
  key?: string;
  leftIcon?: string;
  rightIcon?: string;
  style?: React.CSSProperties;
};

export type YearData = {
  year: number;
  months: {
    name: string;
    days: (number | null)[];
  }[];
};
