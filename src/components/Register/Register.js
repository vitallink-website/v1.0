import { Container, Form, Button } from "react-bootstrap";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import React, { useState } from "react";

function Register() {
  const [deviceRegistered, setDeviceRegistered] = useState(0);
  const [deviceCheck, setDeviceCheck] = useState(0);
  const [registerationCode, setRegisterationCode] = useState("");

  function checkRegisterationCode() {
    console.log("check" + registerationCode);
    setDeviceRegistered(true);
    if (registerationCode > 100000000) {
      localStorage.setItem("AUTH", "true");
      setDeviceCheck(true);
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
              maxLength={10}
              type="input"
              placeholder="serial number"
              className="register-input"
              value={registerationCode}
              onChange={(event) => setRegisterationCode(event.target.value)}
            />
          </Form.Group>
          <Button type="button" onClick={() => checkRegisterationCode()}>
            Confirm
          </Button>
          <br />
          <br />
          <br />
          {deviceRegistered ? (
            deviceCheck ? (
              <h3 style={{ color: "green" }}>
                {" "}
                “Device Name” is Registered <AiOutlineCheck />
              </h3>
            ) : (
              <h3 style={{ color: "red" }}>
                Registration Failed <AiOutlineClose />{" "}
              </h3>
            )
          ) : (
            <></>
          )}
        </Form>
      </Container>
    </div>
  );
}

export default Register;
