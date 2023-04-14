import styled from "styled-components";
import { Button } from "primereact/button";
import { ButtonStyle } from "../../../components/reusable/ButtonStyle";
import { useState } from "react";
import { InputTextGroup } from "../../../components/reusable/InputTextGroup";

const LogoRow = styled.div`
  margin-top: 5em;
`;

export const Container = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;

const RegisterForm = () => {
  const [form, setForm] = useState({
    serial: "",
  });
  const onChangeValue = (n, v) => setForm({ ...form, [n]: v });
  return (
    <Container>
      <br/>
      <InputTextGroup
        state={form.serial}
        placeHolder={"Serial number"}
        setState={(v) => onChangeValue("serial", v)}
        label={"Serial number"}
      />
      <Button disabled={form.serial < 1000000} style={ButtonStyle}>
        Continue {">"}
      </Button>
    </Container>
  );
};

export default RegisterForm;
