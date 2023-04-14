import styled from "styled-components";
import Icon from "../../../assets/svg/hekidesk-green.svg";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { ButtonStyle } from "../../../components/reusable/ButtonStyle";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Dropdown } from "primereact/Dropdown";

const Container = styled.div`
  display: grid;
  place-items: center;
`;

const Title = styled.h1`
  font-size: 36px;
  color: var(--title-color);
  margin-left: 0.2em;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;
`;

const InputGroup = ({ state, setState, label, placeHolder }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "0.5em 0",
      }}
    >
      <label htmlFor={label}>Username</label>
      <InputText
        id={label}
        aria-describedby={label}
        style={{ width: "100%" }}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeHolder}
      />
    </div>
  );
};

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    dof: "",
    weight: "",
    height: "",
    gender: 0,
  });
  const onChangeValue = (n, v) => setForm({ ...form, [n]: v });
  return (
    <Container>
      <LogoRow>
        <Image src={Icon} alt="icon" width="60px" />
        <Title>Hekidesk</Title>
      </LogoRow>
      <InputGroup
        state={form.username}
        placeHolder={"Name"}
        setState={(v) => onChangeValue("username", v)}
      />
      <InputGroup
        state={form.dof}
        placeHolder={"Date of birth"}
        setState={(v) => onChangeValue("dof", v)}
      />
      <InputGroup
        state={form.weight}
        placeHolder={"Weight (kg)"}
        setState={(v) => onChangeValue("weight", v)}
      />
      <InputGroup
        state={form.height}
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

      <br />
      <Button style={ButtonStyle}>Sign in</Button>
    </Container>
  );
};

export default RegisterForm;
