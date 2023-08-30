import React, { useState, useEffect } from "react";
import axios from "axios";
import MaxWeeklyInfo from "../components/MaxWeeklyInfo";

function MaxWeekInfo(props) {
  const { mostWindy } = props;

  return (
    <div>
      <div className="w-full bg-white dark:bg-slate-200 shadow rounded-lg">{mostWindy && <MaxWeeklyInfo data={mostWindy} />}</div>
    </div>
  );
}

export default MaxWeekInfo;
