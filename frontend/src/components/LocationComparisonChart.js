import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import moment from "moment";

const LocationComparisonChart = ({ mapData, filterBy, strokeColor = "#8884d8" }) => {
  const data = mapData.map((item) => ({
    ...item,
    time: moment(item.time, "DD-MM-YYYY h:mm:ss a").toDate(),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-300 rounded">
          <p className="label">{`Time: ${moment(payload[0].payload.time, "DD-MM-YYYY h:mm:ss a").format("HH:mm:ss")}`}</p>
          <p className="label">{`${filterBy}: ${payload[0].payload[filterBy]}`}</p>
        </div>
      );
    }
    return null;
  };

  const maxX = Math.max(...data.map((item) => moment(item.time, "DD-MM-YYYY h:mm:ss a").valueOf()));
  const minX = Math.min(...data.map((item) => moment(item.time, "DD-MM-YYYY h:mm:ss a").valueOf()));

  const maxY = Math.max(...data.map((item) => item[filterBy]));

  return (
    <div className="m-2">
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" domain={[minX, maxX]} tickFormatter={(unixTime) => moment(unixTime).format("HH:mm:ss")} />
        <YAxis domain={[0, maxY]} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey={filterBy} stroke={strokeColor} name={filterBy} />
      </LineChart>
    </div>
  );
};

export default LocationComparisonChart;
