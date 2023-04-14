import styled from "styled-components";
import Icon from "../../../assets/svg/hekidesk-green.svg";
import UserIcon from "../../../assets/icon/user.svg";
import { Image } from "primereact/image";
import { Button } from "primereact/button";

const Container = styled.div`
  display: grid;
  place-items: center;
`;

const Title = styled.h1`
  font-size: 36px;
  color: var(--title-color);
  margin-left: 0.5em;
`;

const Text = styled.h5`
  font-size: 24px;
  margin: 1em;
  color: var(--title-color);
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 200em;
`;

const ButtonStyle = {
  backgroundColor: "var(--title-color)",
  borderColor: "var(--title-color)",
  fontSize: "32em",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "1em 0",
};

const ButtonOKStyle = {
  backgroundColor: "white",
  border: "2px solid var(--title-color)",
  fontSize: "32em",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "1em 0",
  color: "var(--title-color)",
};

const HomeForm = () => {
  return (
    <Container>
      <LogoRow>
        <Image src={Icon} alt="icon" width="60px" />
        <Title>Hekidesk</Title>
      </LogoRow>
      <Text>Home</Text>
      <Button style={ButtonStyle}>
        <img src={UserIcon} alt="user" style={{ marginRight: "1em" }} />
        Select User
      </Button>
      <Button style={ButtonStyle}>
        <img src={UserIcon} alt="user" style={{ marginRight: "1em" }} />
        Select Device
      </Button>
      <Button style={ButtonOKStyle}>OK</Button>
    </Container>
  );
};

export default HomeForm;
