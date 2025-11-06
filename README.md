
![Logo](https://surely-assets.s3.ap-southeast-1.amazonaws.com/vecteezy_calendar-icon-vector_5988959.jpg)


# react-js-simple-calendar


![npm version](https://img.shields.io/npm/v/react-js-simple-calendar.svg?style=flat-square)



A simple, customizable React calendar component for your projects.

react-js-simple-calendar is a simple, easy-to-use React calendar component designed for modern web applications.
## 🌟 Features

- Easy to integrate into any React project
- Light and dark themes
- Minimum and maximum date restrictions
- Callback on date selection
- Supports both string and Date objects for date props
- Fully responsive


## Installation (for standard modern project)

```bash
  npm i react-js-simple-calendar
```
    
## Example Usage

Below is a simple example demonstrating how to import and use the `Calendar` component from the `react-js-simple-calendar` package in a React application:

```javascript
import React from 'react';
import { Calendar } from 'react-js-simple-calendar';

function App() {
  return (
    <div>
      <h1>My Calendar App</h1>
      <Calendar />
    </div>
  );
}

export default App;
```

## 📦 Props

| **Prop** | **Type** | **Default** | **Description** |
|:----------|:----------|:------------|:----------------|
| `date` | `string` / `Date` | `new Date()` | Sets the initial selected date. |
| `onChange` | `function` | — | Callback that returns the selected date when changed. |
| `theme` | `string` | `"light"` | Calendar theme. Accepts `"light"` or `"dark"`. |
| `minDate` | `string` / `Date` | — | Minimum selectable date. Dates before this will be disabled. |
| `maxDate` | `string` / `Date` | — | Maximum selectable date. Dates after this will be disabled. |

## 🖼️ Advanced Usage

You can customize the calendar, handle date changes, and apply restrictions like minimum and maximum selectable dates. Here's an example:

```javascript
import React, { useState } from "react";
import { Calendar } from "react-js-simple-calendar";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  return (
    <div>
      <h1>Selected Date: {selectedDate.toDateString()}</h1>

      <Calendar
        date={selectedDate}          // Initial selected date
        onChange={handleDateChange}  // Callback on date change
        theme="dark"                 // Choose "light" or "dark"
        minDate="2023-01-01"         // Disable dates before this
        maxDate="2025-12-31"         // Disable dates after this
      />
    </div>
  );
}

export default App;
```
## 🔧 Contributing

Contributions are always welcome! Whether it's fixing bugs, improving documentation, or adding new features, your help is appreciated.

### How to Contribute

1. **Fork the repository**  
   Click the "Fork" button at the top-right of the repository page.

2. **Clone your fork**  
   ```bash
   git clone https://github.com/ujjalCha1/react-js-simple-calendar
   cd react-js-simple-calendar
