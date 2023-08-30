import React, { useState, useEffect } from "react";
import axios from "axios";
import MaxWeeklyInfo from "../components/MaxWeeklyInfo";

function MaxWeekInfo(props) {
  const { mostWindy } = props;

  return (
    <div>
      {/* <h1 className="h-16 flex bg-white dark:bg-slate-200 w-full mb-4 p-4 shadow text-xl font-bold rounded-lg">Most Windy Day </h1> */}
      <div className="w-full m-auto flex justify-center  bg-white dark:bg-slate-200 shadow rounded-lg ">
        {mostWindy && <MaxWeeklyInfo data={mostWindy} />}
      </div>
    </div>
  );
}

export default MaxWeekInfo;
