import Particle from "../Particle";
import { Row, Col, Button, Dropdown, DropdownButton } from "react-bootstrap";
import ContactUs from "./ContactUs";
import { Link, useNavigate } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

function Home({ isSignedIn, isUserSelected }) {
  const UserInfo = useContext(UserContext);

  const { getAll } = useIndexedDB("users");
  const router = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAll().then((usersFromDB) => {
      setUsers(usersFromDB);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (user) => {
    UserInfo.setIsUserSelected(true);
    UserInfo.SetAllInfo(user);
    router("/Measure");
  };

  return (
    <div>
      <Particle />
      <div className="home-section">
        {isSignedIn && isUserSelected && (
          <Row>
            <h1>Welcome to the Vital Link!</h1>
            <h6>Select Measurement to start the process.</h6>
            <Link to="/Measure">
              <Button className="register-btn-inner" size="lg">
                Measurement
              </Button>
            </Link>
          </Row>
        )}
        {!isSignedIn && (
          <Row>
            <Col>
              <Link to="/Register">
                <Button className="register-btn-inner" size="lg">
                  Register your device
                </Button>
              </Link>
            </Col>
          </Row>
        )}
        {!isUserSelected && (
          <Row>
            <Col>
              <DropdownButton className="user-dropdown-btn" title="Select User">
                {users.map((user) => (
                  <Dropdown.Item
                    key={user.id}
                    className="user-dropdown-link"
                    href=""
                    onClick={() => handleChange(user)}
                  >
                    {user.name}
                  </Dropdown.Item>
                ))}
                <Dropdown.Divider />
                <Dropdown.Item className="user-dropdown-link">
                  <Link to="/CreateUser">Create User</Link>
                </Dropdown.Item>
              </DropdownButton>
              <h4 style={{ fontFamily: "cursive", paddingTop: "50px" }}>
                Please select an user
              </h4>
            </Col>
          </Row>
        )}
      </div>

      <ContactUs />
    </div>
  );
}

export default Home;
