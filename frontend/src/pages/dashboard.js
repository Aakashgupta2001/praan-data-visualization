import React, { useState, useEffect } from "react";

import { useGetWindDataMutation } from "../store/services/windApi";
import TimeSeries from "../views/TimeSeries";
import MaxWeekInfo from "../views/MaxWeekInfo";
import Filter from "../views/Filter";
import LocationChart from "../views/LocationChart";

function Dashboard() {
  const [getWindData, { data: windData, error: windError, isError: isWindError, isSuccess: isWindSuccess }] = useGetWindDataMutation();
  const [dateRange, setDateRange] = useState();

  useEffect(() => {
    getWindData(dateRange);
  }, [dateRange]);

  if (windError) return <div>Error: {windError}</div>;

  return (
    // Right Aligned Columns
    <>
      {!windData && <div className="self-end w-full  m-5 ">Loading...</div>}
      <div className="py-5 mx-10 pt-20">
        <Filter setDateRange={setDateRange} />
        <div className="flex ">
          {/* left Aligned items */}
          <div className=" w-2/5 my-5 mr-5">
            <MaxWeekInfo mostWindy={windData?.data?.mostWindy} />
          </div>

          {/* right aligned items */}
          <div className="self-end w-3/5 my-5">
            <TimeSeries mappingData={windData?.data?.mappingData} />
          </div>
        </div>
        <LocationChart dateRange={dateRange} />
      </div>
    </>
  );
}

export default Dashboard;
