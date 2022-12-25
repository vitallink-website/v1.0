// import { Container, Row, Col, Button} from "react-bootstrap";
import Particle from "../Particle";
import { Row, Col, Button, Dropdown, DropdownButton } from "react-bootstrap";
import React from "react";
import Home2 from "./Home2";
import { Link } from "react-router-dom";
import { useIndexedDB } from 'react-indexed-db';
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

function Home() {
  const UserInfo = useContext(UserContext);

  const { getAll } = useIndexedDB('users');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAll().then(usersFromDB => {
      setUsers(usersFromDB);
    });
  }, []);

  const handleChange = (user) => {
    UserInfo.setIsUserSelected(true);
    UserInfo.setUsername(user.name);
    UserInfo.setDate(user.date);
    UserInfo.setWeight(user.weight);
    UserInfo.setHeight(user.height);
    UserInfo.setGender(user.gender);
  };

  return (
    <div>
      <Particle />
      <div className="home-section">
        <Row>
          <Col>
            <Link to="/Register">
              <Button className="register-btn-inner" size="lg">
                {" "}
                Register your device
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <DropdownButton className="user-dropdown-btn" title="Select User">
              {users.map(user => (
                  <Dropdown.Item className="user-dropdown-link" href="" onClick={() => handleChange(user)}>{user.name}</Dropdown.Item>
                ))}
              <Dropdown.Divider />
              <Dropdown.Item className="user-dropdown-link" href="/CreateUser">Create User</Dropdown.Item>
            </DropdownButton>            
          </Col>
        </Row>
      </div>

        <Home2 />
    </div>
  );
}

export default Home;
