import React, { useState, useEffect } from "react";
import axios from "axios";
import LocationComparisonChart from "../components/LocationComparisonChart";
import Dropdown from "../components/Dropdown";

function LocationChart(props) {
  const { mappingData } = props;
  const [filterBy, setFilterBy] = useState("speed");
  const options = ["speed", "p1", "p25", "p10"];

  const onSelect = (value) => {
    setFilterBy(value);
  };

  return (
    <div>
      <div className="w-full bg-white dark:bg-slate-200 rounded-lg h-2/3 p-4 ">
        <div className="topBar flex  justify-between mx-5">
          <h2 className="font-bold text-lg mb-5">Location Comparision Chart</h2>
          {/* dropdown to select filter value top right of the component */}
          <Dropdown options={options} onSelect={onSelect} selectedValue={filterBy} />
        </div>
        {/* 3 columns containing comparision Charts for diffrent locations*/}
        {mappingData && (
          <div className="charts flex overflow-y-auto w-full">
            <div className="flex flex-col items-center">
              <LocationComparisonChart mapData={mappingData} filterBy={filterBy} strokeColor="#8884d8" />
              Location 1
            </div>
            <div className="flex flex-col items-center">
              <LocationComparisonChart mapData={mappingData} filterBy={filterBy} strokeColor="#82ca9d" />
              Location 2
            </div>
            <div className="flex flex-col items-center">
              <LocationComparisonChart mapData={mappingData} filterBy={filterBy} strokeColor="#ffc658" />
              Location 3
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationChart;
