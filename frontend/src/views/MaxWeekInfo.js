import React, { useState, useEffect } from "react";
import axios from "axios";
import MaxWeeklyInfo from "../components/MaxWeeklyInfo";

function MaxWeekInfo(props) {
  const { mostWindy } = props;

  //view for ui component of max weekly info of wind speed
  return (
    <div>
      <div className=" m-auto bg-white dark:bg-slate-200 shadow rounded-lg ">{mostWindy && <MaxWeeklyInfo data={mostWindy} />}</div>
    </div>
  );
}

export default MaxWeekInfo;
