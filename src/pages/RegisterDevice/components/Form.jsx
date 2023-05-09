import { Button } from "primereact/button";
import { ButtonStyle } from "../../../components/reusable/ButtonStyle";
import { useState } from "react";
import { InputTextGroup } from "../../../components/reusable/InputTextGroup";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "./CSS";


const RegisterForm = () => {
  const [form, setForm] = useState({
    serial: "",
  });
  const onChangeValue = (n, v) => setForm({ ...form, [n]: v });

  const history = useNavigate();

  return (
    <Container>
      <br />
      <InputTextGroup
        state={form.serial}
        placeHolder={"Serial number"}
        setState={(v) => onChangeValue("serial", v)}
        label={"Serial number"}
      />

      <Row>
        <Col>
          <Button style={ButtonStyle} onClick={() => history(-1)}>
            back
          </Button>
        </Col>
        <Col>
          <Button disabled={form.serial < 1000000} style={ButtonStyle}>
            Continue {">"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
