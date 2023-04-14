import styled from "styled-components";
import Icon from "../../../assets/svg/hekidesk-green.svg";
import UserIcon from "../../../assets/icon/user.svg";
import DeviceIcon from "../../../assets/icon/device.svg";
import { Image } from "primereact/image";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { ButtonStyle } from "../../../components/reusable/ButtonStyle";
import { ContainerWithoutHeight } from "../../../components/reusable/Container";

const Title = styled.h1`
  font-size: 36px;
  color: var(--title-color);
  margin-left: 0.2em;
`;

const Text = styled.h5`
  font-size: 24px;
  margin: 0.8em;
  color: var(--title-color);
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3em;
`;

const ButtonOKStyle = {
  backgroundColor: "white",
  border: "2px solid var(--title-color)",
  fontSize: "18px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "1em 0",
  color: "var(--title-color)",
  padding: "0.4em 0.6em",
};

const HomeForm = () => {
  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <Image src={Icon} alt="icon" width="60px" />
        <Title>Hekidesk</Title>
      </LogoRow>
      <Text>Home</Text>
      <Link to="/login" style={ButtonStyle}>
        <img
          src={UserIcon}
          alt="user"
          style={{ marginRight: "0.8em" }}
          width={"20"}
        />
        Select User
      </Link>
      <Link to="/register-device" style={ButtonStyle}>
        <img
          src={DeviceIcon}
          alt="user"
          style={{ marginRight: "0.8em" }}
          width={"20"}
        />
        Select Device
      </Link>
      <Button style={ButtonOKStyle}>OK</Button>
    </ContainerWithoutHeight>
  );
};

export default HomeForm;
