import { useIndexedDB } from "react-indexed-db";
import { UserContext } from "../App";
import { useContext } from "react";
import { GetCurrentDateTimeDB } from "./time";

export const useAddToDB = (DBName) => {
  const { update: updateParameterHistory } = useIndexedDB(DBName);
  const { getByID, update: updateTimeHistory } = useIndexedDB("dataTime");
  const UserInfo = useContext(UserContext);

  const currentDate = GetCurrentDateTimeDB();
  const id = parseInt(String(currentDate + UserInfo.id));
  console.log(id);

  const updateHistory = (timeData) => {
    updateParameterHistory({
      dateAndId: id,
      userId: UserInfo.id,
      ...timeData,
    }).then(
      (event) => {
        console.log(DBName + " updated: ", event);
      },
      (error) => {
        console.log(error);
      }
    );

    var newParameter = timeData;
    getByID(id)
      .then((data) => {
        var newData = {};
        if (typeof data !== 'undefined')
          newData = data.parameters;
          console.log("old: " + JSON.stringify(newData));
          newParameter = { ...newData, ...timeData };
          console.log("new: " + JSON.stringify(newParameter));
      })
      .then(() => {
        updateTimeHistory({
          dateAndId: id,
          userId: UserInfo.id,
          parameters: newParameter,
        }).then(
          (event) => {
            console.log("timeData updated: ", event);
          },
          (error) => {
            console.log(error);
          }
        );
      });
  };

  return {
    updateHistory,
  };
};
