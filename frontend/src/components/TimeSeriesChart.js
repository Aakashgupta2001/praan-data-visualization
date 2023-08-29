import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import moment from "moment";

const TimeSeriesChart = ({ data }) => {
  const parsedData = data.map((item) => ({
    ...item,
    time: moment(item.time, "DD-MM-YYYY h:mm:ss a").valueOf(), // Convert the date to a Unix timestamp (milliseconds since the Unix Epoch)
  }));

  return (
    <LineChart width={500} height={300} data={parsedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="time"
        domain={["auto", "auto"]}
        name="Time"
        tickFormatter={(unixTime) => moment(unixTime).format("DD-MM-YYYY h:mm:ss a")}
        type="number"
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="p1" stroke="#8884d8" />
      <Line type="monotone" dataKey="p25" stroke="#82ca9d" />
      <Line type="monotone" dataKey="p10" stroke="#ff7300" />
    </LineChart>
  );
};

export default TimeSeriesChart;
