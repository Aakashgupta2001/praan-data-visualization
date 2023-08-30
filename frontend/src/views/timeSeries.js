import React, { useState, useEffect } from "react";
import axios from "axios";
import TimeSeriesChart from "../components/TimeSeriesChart";

function TimeSeries(props) {
  const { mappingData } = props;

  return (
    <div>
      <div className="w-full bg-white dark:bg-slate-200 rounded-lg p-4 flex flex-col items-center justify-center mt-5">
        <h2 className="font-bold text-lg mb-5">Time Series Chart, P1 VS P25 VS P10</h2>
        {mappingData && <TimeSeriesChart mapData={mappingData} />}
      </div>
    </div>
  );
}

export default TimeSeries;
