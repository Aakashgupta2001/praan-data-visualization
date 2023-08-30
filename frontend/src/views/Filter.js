import React, { useState, useEffect } from "react";
import axios from "axios";
import DateRangeFilter from "../components/DateRangeFilter";

function Filter(props) {
  const { setDateRange } = props;

  const handleDateRangeFilter = (dates) => {
    console.log("Selected range:", dates);
    setDateRange(dates);
  };

  // view for styling the component
  return (
    <div>
      <div className=" bg-white dark:bg-slate-200 shadow rounded-lg ">
        <DateRangeFilter onFilter={handleDateRangeFilter} />
      </div>
    </div>
  );
}

export default Filter;
