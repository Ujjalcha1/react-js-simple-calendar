// export * from "./calendar";
import { Calendar } from "./Calendar";
import { indexProps } from "./types";

const App = ({
  className,
  date,
  format,
  key,
  leftIcon,
  rightIcon,
  style,
}: indexProps) => {
  return (
    <Calendar
      className={className}
      date={date}
      format={format}
      key={key}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      style={style}
    />
  );
};

export default App;
