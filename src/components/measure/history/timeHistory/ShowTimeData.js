import React, { useState } from "react";
import { createContext } from "react";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import Diagram from "../../../Diagram/Diagram";

export const DataContext = createContext({});

function ShowTimeData(data) {


  return (
    <>
      <Accordion.Header>
        {data.hasOwnProperty("ecgData") ? (
          <h6>ECG data: {data["date"]}</h6>
        ) : data.hasOwnProperty("ppgData") ? (
          <h6>PPG data: {data["date"]}</h6>
        ) : (
          <h6></h6>
        )}
      </Accordion.Header>
      <Accordion.Body>
        {data.hasOwnProperty("ecgData") ? (
          <h6>
            ECG data <br /> heart beat: {data["heartBeat"]} SPO2 is:{" "}
            {data["SPO2"]}{" "}
          </h6>
        ) : data.hasOwnProperty("ppgData") ? (
          <h6>
            PPG data <br /> heart beat: {data["heartBeat"]}{" "}
          </h6>
        ) : (
          <h6></h6>
        )}
        <br />
        <DataContext.Provider
          value={{showData : (data.hasOwnProperty("ecgDataaa")
          ? data["ecgData"] 
          : data.hasOwnProperty("ppgData")
          ? data["ppgData"]
          : [1,2])}}
        >
          {data.hasOwnProperty("ecgData") ? (
            <Link to="/Measure/History/TimeHistory/ecgData">
              see the chart of data
            </Link>
          ) : data.hasOwnProperty("ppgData") ? (
            <Link to="/Measure/History/TimeHistory/ppgData">
              see the chart of data
            </Link>
          ) : (
            <></>
          )}
        </DataContext.Provider>
        <Diagram dataKey={"ppgData"} flow={data["ppgData"]} texts="" />
        </Accordion.Body>
    </>
  );
}

export default ShowTimeData;
