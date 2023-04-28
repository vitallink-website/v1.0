import styled from "styled-components";
import Icon from "../../../assets/svg/hekidesk-green.svg";
import UserIcon from "../../../assets/icon/user.svg";
import DeviceIcon from "../../../assets/icon/device.svg";
import { Image } from "primereact/image";
import { Link } from "react-router-dom";
import { ButtonStyle } from "../../../components/reusable/ButtonStyle";
import { ContainerWithoutHeight } from "../../../components/reusable/Container";
import { Text } from "../../../components/reusable/Text";
import { Title } from "../../../components/reusable/Title";

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
  textDecoration: "none",
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
      <Link to="/base" style={ButtonOKStyle}>
        Go to Measurement
      </Link>
    </ContainerWithoutHeight>
  );
};

export default HomeForm;
