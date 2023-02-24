import { useIndexedDB } from "react-indexed-db";
import { UserContext } from "../App";
import { useContext } from "react";
import { GetCurrentDateTimeDB } from "./time";

function AddToDB({DBName, data}){
  const { update: updateParameterHistory } = useIndexedDB(DBName);
  const { update: updateTimeHistory } = useIndexedDB("dataTime");
  const UserInfo = useContext(UserContext);

  const currentDate = GetCurrentDateTimeDB();
  const id = parseInt(String(currentDate + UserInfo.id))
  
  updateParameterHistory({
    dateAndId: id,
    userId: UserInfo.id,
    data,
  }).then(
    (event) => {
      console.log("cardiogramData updated: ", event);
    },
    (error) => {
      console.log(error);
    }
  );

  var newParameter = UserInfo.parameters;
  Object.keys(data).map((d) => (newParameter[d] = data[d]));

  updateTimeHistory({
    dateAndId: id,
    parameters: newParameter,
  }).then(
    (event) => {
      console.log("timeData updated: ", event);
    },
    (error) => {
      console.log(error);
    }
  );
};

export default AddToDB;
