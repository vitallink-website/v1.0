import { useEffect, useState } from "react";

export const useUserInfo = () => {
  const [user, setUser] = useState({
    id: -1,
    username: "",
    date: "",
    weight: 0,
    height: 0,
    gender: true,
  });
  const [isUserSelected, setIsUserSelected] = useState(false);

  useEffect(() => {
    if (user.id > 0) setIsUserSelected(true);
  }, [user]);

  const setInfo = (user) => {
    setIsUserSelected(true);
    setUser({
      id: user.id,
      username: user.name,
      date: user.dob,
      weight: user.weight,
      height: user.height,
      gender: user.gender,
    });
  };

  return {
    user,
    setInfo,
    isUserSelected,
  };
};

export default useUserInfo;
