import React, { useState, useEffect } from "react";
import axios from "axios";
import TimeSeriesChart from "../components/TimeSeriesChart";

function TimeSeries(props) {
  const { mappingData } = props;

  return (
    <div>
      <TimeSeriesChart data={mappingData} />
    </div>
  );
}

export default TimeSeries;
