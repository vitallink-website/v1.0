import styled from "styled-components";
import Icon from "../../../assets/svg/hekidesk-green.svg";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/Dropdown";
import { useState } from "react";
import { ButtonStyle } from "../../../components/reusable/ButtonStyle";
import { Link } from "react-router-dom";
import { ContainerWithoutHeight } from "../../../components/reusable/Container";
import { Text } from "../../../components/reusable/Text";

const Title = styled.h1`
  font-size: 36px;
  color: var(--title-color);
  margin-left: 0.2em;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3em;
`;

const LoginForm = () => {
  const [selected, setSelected] = useState(null);
  const users = [
    { name: "Test1", code: "Ts1" },
    { name: "Test2", code: "Ts2" },
    { name: "Test3", code: "Ts3" },
    { name: "Test4", code: "Ts4" },
    { name: "Test5", code: "Ts5" },
    { name: "Test6", code: "Ts6" },
    { name: "Test7", code: "Ts7" },
    { name: "Test8", code: "Ts8" },
  ];

  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <Image src={Icon} alt="icon" width="60px" />
        <Title>Hekidesk</Title>
      </LogoRow>
      <Text>Welcome</Text>
      <Dropdown
        value={selected}
        onChange={(e) => setSelected(e.value)}
        options={users}
        optionLabel="name"
        placeholder="Select a user"
        style={{ width: "100%" }}
      />
      <br />
      <Button style={ButtonStyle}>Sign in</Button>
      <LogoRow>
        <p>Dont have an account?</p>
        <Link
          to="/register-user"
          style={{ color: "var(--title-color)", margin: "0 0.5em" }}
        >
          Sign up
        </Link>
      </LogoRow>
    </ContainerWithoutHeight>
  );
};

export default LoginForm;
