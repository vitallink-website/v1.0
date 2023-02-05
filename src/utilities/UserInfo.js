import { useState } from "react";

export const UserInfo = () => {
  const [id, setId] = useState(-1);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [lastDateMeasured, setLastDateMeasured] = useState('');
  const [parameters, setParameters] = useState({
    heartBeatPPG: '',
    SPO2: '',
    heartBeatECG: '',
    QRS_Duration: '',
    PR_RR_Interval: '',
    SYS_DIA: ''
})

  const SetAllInfo = (user) => {
    setIsUserSelected(true);
    setId(user.id);
    setUsername(user.name);
    setDate(user.dob);
    setWeight(user.weight);
    setHeight(user.height);
    setGender(user.gender);
  };

  return {
    id,
    setId,
    isUserSelected,
    setIsUserSelected,
    username,
    setUsername,
    setDate,
    setWeight,
    setHeight,
    setGender,
    SetAllInfo,
    date,
    weight,
    height,
    gender,
    lastDateMeasured,
    setLastDateMeasured, 
    parameters,
    setParameters,
  };
};

export default UserInfo;
