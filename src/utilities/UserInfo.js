import React from "react";
import { useState } from "react";

export const UserInfo = () => {
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const SetAllInfo = (user) => {
    console.log("🚀 ~ file: UserInfo.js:12 ~ SetAllInfo ~ user", user)
    setUsername(user.username);
    setDate(user.date);
    setWeight(user.weight);
    setHeight(user.height);
    setGender(user.gender);
  };
  return {
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
