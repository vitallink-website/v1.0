import React from "react";
import { useState } from "react";

export const UserInfo = () => {
  const [id, setId] = useState(-1);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");

  const SetAllInfo = (user) => {
    setIsUserSelected(true);
    console.log("Second: ", user.id);
    setId(user.id);
    setUsername(user.name);
    setDate(user.date);
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
    SetAllInfo
  };
};

export default UserInfo;
