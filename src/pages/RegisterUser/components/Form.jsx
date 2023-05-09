import Icon from "../../../assets/svg/hekidesk-green.svg";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { ButtonStyle } from "../../../components/reusable/ButtonStyle";
import { useState } from "react";
import { Dropdown } from "primereact/Dropdown";
import { InputTextGroup } from "../../../components/reusable/InputTextGroup";
import { ContainerWithoutHeight } from "../../../components/reusable/Container";
import { useNavigate } from "react-router-dom";
import { Col, LogoRow, Row, Title } from "./CSS";


const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    dof: "",
    weight: "",
    height: "",
    gender: 0,
  });
  const onChangeValue = (n, v) => setForm({ ...form, [n]: v });

  const history = useNavigate();

  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <Image src={Icon} alt="icon" width="60px" />
        <Title>Hekidesk</Title>
      </LogoRow>
      <InputTextGroup
        state={form.username}
        placeHolder={"Name"}
        label="Name"
        setState={(v) => onChangeValue("username", v)}
      />
      <InputTextGroup
        state={form.dof}
        label={"Date of birth"}
        placeHolder={"YYYY-MM-DD"}
        setState={(v) => onChangeValue("dof", v)}
      />
      <InputTextGroup
        state={form.weight}
        label={"Weight"}
        placeHolder={"Weight (kg)"}
        setState={(v) => onChangeValue("weight", v)}
      />
      <InputTextGroup
        state={form.height}
        label={"Height"}
        placeHolder={"Height (cm)"}
        setState={(v) => onChangeValue("height", v)}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: "0.5em 0",
        }}
      >
        <label htmlFor={"gender"}>Gender</label>
        <Dropdown
          value={form.gender}
          onChange={(v) => onChangeValue("gender", v)}
          options={[
            { name: "Male", code: 1 },
            { name: "Female", code: 0 },
          ]}
          optionLabel="name"
          placeholder="Select a gender"
        />
      </div>
      <Row>
        <Col>
          <Button style={ButtonStyle} onClick={() => history(-1)}>
            back
          </Button>
        </Col>
        <Col>
          <Button style={ButtonStyle}>Sign in</Button>
        </Col>
      </Row>
    </ContainerWithoutHeight>
  );
};

export default RegisterForm;
