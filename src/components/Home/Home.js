import Particle from "../Particle";
import { Row, Col, Button, Dropdown, DropdownButton } from "react-bootstrap";
import React from "react";
import Home2 from "./Home2";
import { Link } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";


function Home({isConnected, isUserSelected }) {
  const UserInfo = useContext(UserContext);

  const { getAll } = useIndexedDB("users");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAll().then((usersFromDB) => {
      setUsers(usersFromDB);
    });
  }, []);

  const handleChange = (user) => {
    console.log("🚀 ~ file: Home.js:24 ~ handleChange ~ user", user);
    UserInfo.setIsUserSelected(true);
    UserInfo.setId(user.id);
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
              {users.map((user) => (
                <Dropdown.Item
                  key = {user.id}
                  className="user-dropdown-link"
                  href=""
                  onClick={() => handleChange(user)}
                  disabled={!isConnected}
                >
                  {user.name}
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item
                className="user-dropdown-link"
                disabled={!isConnected}
              >
                <Link to="/CreateUser">Create User</Link>
              </Dropdown.Item>
            </DropdownButton>
            {isUserSelected ? (
              <></>
            ) : (
              <h4 style={{ fontFamily: "cursive", paddingTop: "50px" }}>
                {" "}
                Please first connect your device, then select an user{" "}
              </h4>
            )}
          </Col>
        </Row>
      </div>

      <Home2 />
    </div>
  );
}

export default Home;
