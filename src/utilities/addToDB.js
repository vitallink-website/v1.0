import { useIndexedDB } from "react-indexed-db";
import { UserContext } from "../../../../App";

export const addToDB = ({DBName, data}) => {
  const { update: updateParameterHistory } = useIndexedDB(DBName);
  const { update: updateTimeHistory } = useIndexedDB("dataTime");
  const UserInfo = useContext(UserContext);

  const currentDate = GetCurrentDateTime();
  if(!isEqualDays(currentDate, UserInfo.lastDateMeasured))
    { UserInfo.parameters = {
      heartBeatPPG: '',
      SPO2: '',
      heartBeatECG: '',
      QRS_Duration: '',
      PR_RR_Interval: '',
      SYS_DIA: ''
    }
    UserInfo.setLastDateMeasured(currentDate);
  }

  updateParameterHistory({
    dateAndId: currentDate + " " + UserInfo.id,
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

  updateTimeHistory({
    dateAndId: currentDate + " " + UserInfo.id,
    parameters: {
      ...UserInfo.parameters,
      data
    },
  }).then(
    (event) => {
      console.log("timeData updated: ", event);
    },
    (error) => {
      console.log(error);
    }
  );
};
