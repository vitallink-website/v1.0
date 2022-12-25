import React from 'react'
import { useState } from 'react';

export const UserInfo = () => {
    const [isUserSelected, setIsUserSelected] = useState(false);
    const [username, setUsername] = useState('');
    const [date, setDate] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [gender, setGender] = useState("");

    return {
        isUserSelected,
        setIsUserSelected,
        username,
        setUsername,
        setDate,
        setWeight,
        setHeight,
        setGender
      };
}

export default UserInfo
