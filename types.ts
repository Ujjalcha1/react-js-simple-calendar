import type React from "react";

export type calenderProps = {
  style?: React.CSSProperties;
  className?: string;
  leftIcon?: any;
  rightIcon?: any;
  format?: string;
  date?: any;
  mode?: "light" | "dark";
  minDate?: Date;
  maxDate?: Date;
};

export type calenderPopupProps = {
  date?: any;
  onChange: (val: Date) => void;
  mode?: "light" | "dark";
  minDate?: Date;
  maxDate?: Date;
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
