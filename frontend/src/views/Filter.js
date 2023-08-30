import React, { useState, useEffect } from "react";
import axios from "axios";
import DateRangeFilter from "../components/DateRangeFilter";

function Filter(props) {
  const { setDateRange } = props;

  const handleDateRangeFilter = (dates) => {
    console.log("Selected range:", dates);
    setDateRange(dates);
    // Handle the filtering logic here or update the state
  };

  return (
    <div>
      <div className="mt-5 mx-10 bg-white dark:bg-slate-200 shadow rounded-lg ">
        <DateRangeFilter onFilter={handleDateRangeFilter} />
      </div>
    </div>
  );
}

export default Filter;
