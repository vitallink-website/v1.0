import { Container, Form, Button } from "react-bootstrap";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [deviceRegistered, setDeviceRegistered] = useState();
  const [deviceCheck, setDeviceCheck] = useState();
  const [registerationCode, setRegisterationCode] = useState("");

  const router = useNavigate();

  function checkRegisterationCode() {
    setDeviceRegistered(true);
    if (registerationCode > 100000000) {
      localStorage.setItem("AUTH", "true");
      setDeviceCheck(true);
      setRegisterationCode(null);
      router("/");
    } else setDeviceCheck(false);
  }

  return (
    <div className="register-section">
      <Container>
        <h1 className="register-title">Registration of device</h1>
        <Form>
          <Form.Group>
            <Form.Label>Enter the serial number</Form.Label>
            <Form.Control
              min={100000000}
              type="number"
              placeholder="serial number"
              className="register-input"
              value={registerationCode}
              onChange={(event) => setRegisterationCode(event.target.value)}
            />
          </Form.Group>
          <Button
            className="mb-5"
            type="button"
            onClick={() => checkRegisterationCode()}
          >
            Confirm
          </Button>
          {deviceRegistered &&
            (deviceCheck ? (
              <h3 style={{ color: "green" }}>
                “Device Name” is Registered <AiOutlineCheck />
              </h3>
            ) : (
              <h3 style={{ color: "red" }}>
                Registration Failed <AiOutlineClose />
              </h3>
            ))}
        </Form>
      </Container>
    </div>
  );
}

export default Register;
