import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useIndexedDB } from "react-indexed-db";

function CreateUser() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const { add } = useIndexedDB("users");

  const handleSelectedChanges = (event) => {
    setGender(event.target.value);
  };

  function Validator() {
    let errors = {};
    if (!name.trim()) {
      errors.userName = "Please enter your name";
    }
    if (!weight) {
      errors.weight = "Please enter your weight";
    }
    if (!height) {
      errors.height = "Please enter your height";
    }
    if (!date.trim()) {
      errors.dob = "Please select your Date of Birth";
    }
    if (!gender.trim()) {
      errors.gender = "Please select your gender";
    }
    return errors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let err = Validator();
    setErrors(err);
    if (!Object.keys(err).length > 0) {
      console.log("hi");
      add({
        name: name,
        weight: weight,
        height: height,
        dob: date,
        gender: gender,
      }).then(
        (event) => {
          console.log("Data added: ", event);
        },
        (error) => {
          console.log(":)");
          console.log(error);
        }
      );
    }
  };

  return (
    <div class="register-section">
      <Container>
        <h1 style={{ marginBottom: "50px" }}>Create a new User</h1>
        <Form>
          <Form.Group className="create-user-input">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            <span className="text-danger">{errors.userName}</span>
          </Form.Group>

          <Form.Group className="create-user-input">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="date"
              onChange={(e) => setDate(e.target.value)}
            />
            <span className="text-danger">{errors.dob}</span>
          </Form.Group>

          <Form.Group className="create-user-input">
            <Form.Label>Weight (kg) </Form.Label>
            <Form.Control
              type="data"
              placeholder="Weight"
              onChange={(e) => setWeight(e.target.value)}
            />
            <span className="text-danger">{errors.weight}</span>
          </Form.Group>

          <Form.Group className="create-user-input">
            <Form.Label>Height (Cm) </Form.Label>
            <Form.Control
              type="data"
              placeholder="Height"
              onChange={(e) => setHeight(e.target.value)}
            />
            <span className="text-danger">{errors.height}</span>
          </Form.Group>

          <Form.Group className="create-user-input">
            <Form.Label>Gender </Form.Label>
            <Form.Select
              defaultValue="Choose..."
              value={gender}
              onChange={handleSelectedChanges}
            >
              <option>Choose...</option>
              <option>Male</option>
              <option>Female</option>
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
