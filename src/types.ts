import type React from "react";

export type calenderProps = {
  style?: React.CSSProperties;
  className?: string;
  leftIcon?: any;
  rightIcon?: any;
  format?: string;
  date?: any;
};

export type calenderPopupProps = {
  date?: any;
  onChange: (val: Date) => void;
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
