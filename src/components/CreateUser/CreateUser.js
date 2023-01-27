import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useIndexedDB } from "react-indexed-db";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    dob: null,
    weight: null,
    height: null,
    gender: null,
  });
  const [errors, setErrors] = useState({});

  const { add } = useIndexedDB("users");
  const UserInfo = useContext(UserContext);
  const history = useNavigate();

  function Validator() {
    let errors = {};
    if (!form.name.trim()) {
      errors.userName = "Please enter your name";
    }
    if (!form.weight) {
      errors.weight = "Please enter your weight";
    }
    if (!form.height || form.height < 50) {
      errors.height = "Please enter your height";
    }
    if (!form.dob) {
      errors.dob = "Please select your Date of Birth";
    }
    if (!form.gender) {
      errors.gender = "Please select your gender";
    }
    return errors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let err = Validator();
    setErrors(Validator());
    let id;
    if (Object.keys(err).length === 0) {
      add(form).then(
        (event) => {
          console.log("Data added: ", event);
          id = event;
          UserInfo.SetAllInfo({
            id,
            ...form,
            date: form.dob,
          });
          history("/");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  return (
    <div className="register-section">
      <Container>
        <h1 style={{ marginBottom: "50px" }}>Create a new User</h1>
        <Form>
          <Form.Group className="create-user-input">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <span className="text-danger">{errors.userName}</span>
          </Form.Group>
          <Form.Group className="create-user-input">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              value={form.dob}
              placeholder="date"
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
            <span className="text-danger">{errors.dob}</span>
          </Form.Group>

          <Form.Group className="create-user-input">
            <Form.Label>Weight (kg) </Form.Label>
            <Form.Control
              value={form.weight}
              placeholder="Weight"
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
            />
            <span className="text-danger">{errors.weight}</span>
          </Form.Group>
          <Form.Group className="create-user-input">
            <Form.Label>Height (Cm) </Form.Label>
            <Form.Control
              type="number"
              value={form.height}
              placeholder="Height"
              onChange={(e) => setForm({ ...form, height: e.target.value })}
            />
            <span className="text-danger">{errors.height}</span>
          </Form.Group>
          <Form.Group className="create-user-input">
            <Form.Label>Gender </Form.Label>
            <Form.Select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value={null}>Choose...</option>
              <option value={false}>Male</option>
              <option value={true}>Female</option>
            </Form.Select>
            <span className="text-danger">{errors.gender}</span>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default CreateUser;
