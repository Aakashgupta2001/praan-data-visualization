import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangeFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState(new Date("2021-03-19"));
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleFilter = (e) => {
    e.preventDefault();

    const startDateTime = new Date(startDate);
    startDateTime.setHours(startTime.getHours());
    startDateTime.setMinutes(startTime.getMinutes());

    const endDateTime = new Date(startDate);
    endDateTime.setHours(endTime.getHours());
    endDateTime.setMinutes(endTime.getMinutes());

    onFilter({ startDateTime, endDateTime });
  };

  return (
    <div className="flex w-full h-16 p-4 bg-white shadow  rounded-lg">
      <div className="flex space-x-4 items-center">
        <label className="text-lg font-semibold">Date:</label>
        <DatePicker
          selected={startDate}
          minDate={new Date("2021-03-19")}
          maxDate={new Date("2021-05-20")}
          onChange={(date) => setStartDate(date)}
          dateFormat="MMMM d, yyyy"
          className="border p-2 rounded-md"
        />
      </div>

      <div className="flex space-x-4 mx-4 items-center">
        <label className="text-lg font-semibold">Select Time:</label>
        <DatePicker
          selected={startTime}
          onChange={(time) => setStartTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeFormat="h:mm aa"
          timeIntervals={15}
          dateFormat="h:mm aa"
          className="border p-2 rounded-md"
        />
      </div>

      <div className="flex space-x-4 items-center">
        <label className="text-lg font-semibold">--</label>
        <DatePicker
          selected={endTime}
          onChange={(time) => setEndTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeFormat="h:mm aa"
          timeIntervals={15}
          dateFormat="h:mm aa"
          className="border p-2 rounded-md"
        />
      </div>

      <button
        onClick={handleFilter}
        className="bg-blue-500 text-white mx-4  h-full w-20 rounded-md hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Filter
      </button>
    </div>
  );
};

export default DateRangeFilter;
