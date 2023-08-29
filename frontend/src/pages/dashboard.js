import React, { useState, useEffect } from "react";
import axios from "axios";
import TimeSeriesChart from "../components/TimeSeriesChart";
import { useGetWindDataMutation } from "../store/services/windApi";
import TimeSeries from "../views/timeSeries";

function Dashboard() {
  const [getMaterialsList, { data: windData, error: windError, isError: isWindError, isSuccess: isWindSuccess }] = useGetWindDataMutation();

  useEffect(() => {
    getMaterialsList();
  }, []);

  if (windError) return <div>Error: {windError}</div>;

  return (
    <div>
      <h1>Time Series Chart</h1>
      {windData && <TimeSeries mappingData={windData.mappingData} />}
    </div>
  );
}

export default Dashboard;
