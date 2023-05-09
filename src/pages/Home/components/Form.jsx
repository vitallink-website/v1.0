import Icon from "../../../assets/svg/hekidesk-green.svg";
import UserIcon from "../../../assets/icon/user.svg";
import DeviceIcon from "../../../assets/icon/device.svg";
import { Image } from "primereact/image";
import { Link } from "react-router-dom";
import { ButtonStyle } from "../../../components/reusable/ButtonStyle";
import { ContainerWithoutHeight } from "../../../components/reusable/Container";
import { Text } from "../../../components/reusable/Text";
import { Title } from "../../../components/reusable/Title";
import { ButtonOKStyle, LogoRow } from "./CSS";

const HomeForm = () => {
  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <Image src={Icon} alt="icon" width="60px" />
        <Title>Hekidesk</Title>
      </LogoRow>
      <Text style={{ color: "var(--title-color)", fontSize: "24px" }}>
        Home
      </Text>
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
        OK
      </Link>
    </ContainerWithoutHeight>
  );
};

export default HomeForm;
