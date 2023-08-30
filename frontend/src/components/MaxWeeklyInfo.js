import React from "react";

const MaxWeeklyInfo = ({ data }) => {
  return (
    <div className="p-4 ">
      <h1 className="text-xl font-bold mb-4">Most Windy Day Of The Week</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-lg font-medium">Day:</div>
        <div className="text-lg">{data.time} </div>

        <div className="text-lg font-medium">Wind Speed:</div>
        <div className="text-lg">{data.speed} km/h</div>

        <div className="text-lg font-medium">Wind Direction:</div>
        <div className="text-lg">{data.direction}</div>

        <div className="text-lg font-medium">PM 1.0:</div>
        <div className="text-lg">{data.p1}</div>

        <div className="text-lg font-medium">PM 2.5:</div>
        <div className="text-lg">{data.p25}</div>

        <div className="text-lg font-medium">PM 10:</div>
        <div className="text-lg">{data.p10}</div>
      </div>
    </div>
  );
};

export default MaxWeeklyInfo;
