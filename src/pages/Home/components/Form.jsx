import Icon from "../../../assets/svg/hekidesk-green.svg";
import DeviceIcon from "../../../assets/icon/device.svg";
import { Image } from "primereact/image";
import { Link } from "react-router-dom";
import { ContainerWithoutHeight } from "../../../components/reusable/Container";
import { Text } from "../../../components/reusable/Text";
import { Title } from "../../../components/reusable/Title";
import { ButtonOKStyle, LogoRow } from "./CSS";
import { Dropdown } from "primereact/Dropdown";
import { Fragment, useEffect, useState } from "react";
import { ButtonStyle } from "../../../components/reusable/ButtonStyle";
import useQuery from "../../../Utility/QueryParam";

const HomeForm = () => {
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
  const query = useQuery();
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const is_valid = query.get("is_valid");
    setStage(is_valid ? 1 : 0);
  }, [query]);
  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <Image src={Icon} alt="icon" width="60px" />
        <Title>Hekidesk</Title>
      </LogoRow>

      {stage === 0 ? (
        <>
          <Text
            style={{
              color: "var(--title-color)",
              fontSize: "16px",
              margin: "2em 0",
            }}
          >
            First, register your Hekidesk device.
          </Text>
          <Link to="/register-device" style={ButtonStyle}>
            <img
              src={DeviceIcon}
              alt="user"
              style={{ marginRight: "0.8em" }}
              width={"20"}
            />
            Select Device
          </Link>
        </>
      ) : (
        <Fragment>
          <Text
            style={{
              color: "var(--title-color)",
              fontSize: "16px",
              margin: "2em 0",
            }}
          >
            Then, sign up with your user.
          </Text>
          <Dropdown
            value={selected}
            onChange={(e) => setSelected(e.value)}
            options={users}
            optionLabel="name"
            placeholder={"Select a user"}
            style={{
              width: "100%",
              textAlign: "center",
              background: "var(--title-color)",
              borderColor: "var(--title-color)",
            }}
          />
          <br />
          <Text
            style={{
              color: "var(--title-color)",
              fontSize: "16px",
              margin: "0.5em 0",
            }}
          >
            or
          </Text>
          <Link to="/register-user" style={ButtonOKStyle}>
            Sign up
          </Link>
        </Fragment>
      )}
    </ContainerWithoutHeight>
  );
};

export default HomeForm;
