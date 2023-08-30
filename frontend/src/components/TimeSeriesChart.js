import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import moment from "moment";

const TimeSeriesChart = ({ mapData }) => {
  const data = mapData.map((item) => ({
    ...item,
    time: moment(item.time, "DD-MM-YYYY h:mm:ss a").toDate(),
  }));

  //custom tooltip created to display date in HH:mm:ss format
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-300 rounded">
          <p className="label">{`Time: ${moment(payload[0].payload.time, "DD-MM-YYYY h:mm:ss a").format("HH:mm:ss")}`}</p>
          <p className="label">{`P1: ${payload[0].payload.p1}`}</p>
          <p className="label">{`P25: ${payload[0].payload.p25}`}</p>
          <p className="label">{`P10: ${payload[0].payload.p10}`}</p>
        </div>
      );
    }
    return null;
  };

  //calculating the maximum and minimum value of x axis (startTime, endTime)
  const maxX = Math.max(...data.map((item) => moment(item.time, "DD-MM-YYYY h:mm:ss a").valueOf()));
  const minX = Math.min(...data.map((item) => moment(item.time, "DD-MM-YYYY h:mm:ss a").valueOf()));

  //calculating the maximum value of Y axis (Particles, p1,p25,p10)
  const maxY = Math.max(...data.map((item) => Math.max(item.p1, item.p25, item.p10)));

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" domain={[minX, maxX]} tickFormatter={(unixTime) => moment(unixTime).format("HH:mm:ss")} />
      <YAxis domain={[0, maxY]} />
      <Tooltip content={<CustomTooltip />} />
      {/* mapping 3 lines */}
      <Line type="monotone" dataKey="p1" stroke="#8884d8" name="P1" />
      <Line type="monotone" dataKey="p25" stroke="#82ca9d" name="P25" />
      <Line type="monotone" dataKey="p10" stroke="#ffc658" name="P10" />
    </LineChart>
  );
};

export default TimeSeriesChart;
