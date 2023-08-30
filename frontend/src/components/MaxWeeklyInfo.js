import React from "react";

const MaxWeeklyInfo = ({ data }) => {
  //component for displaying maximum wind speed of the week data
  return (
    <div className="p-4 px-10 py-11 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Most Windy Day Of The Week</h1>
      <div className="grid grid-cols-2 w-full gap-4 content-center   ">
        <div className="text-lg  font-medium m-auto">Day:</div>
        <div className="text-lg m-auto">{data.time} </div>

        <div className="text-lg m-auto font-medium">Wind Speed:</div>
        <div className="text-lg m-auto">{data.speed} km/h</div>

        <div className="text-lg m-auto font-medium">Wind Direction:</div>
        <div className="text-lg m-auto">{data.direction}</div>

        <div className="text-lg m-auto font-medium">PM 1.0:</div>
        <div className="text-lg m-auto">{data.p1} Particle</div>

        <div className="text-lg m-auto font-medium">PM 2.5:</div>
        <div className="text-lg m-auto">{data.p25} Particle</div>

        <div className="text-lg m-auto font-medium">PM 10:</div>
        <div className="text-lg m-auto">{data.p10} Particle</div>
      </div>
    </div>
  );
};

export default MaxWeeklyInfo;
