import React, { useContext, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineUser, AiOutlineLogin } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { CiStethoscope } from "react-icons/ci";
import { DeviceContext } from "../App";

function NavBar({ username }) {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }
  const bluetooth = useContext(DeviceContext);

  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        {/* <Navbar.Brand href="/" className="d-flex">
          <img
            src={logo}
            className="img-fluid logo"
            alt="brand"
            width="100px"
            height="80px"
          />
        </Navbar.Brand> remember this for putting logo*/}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/measure"
                onClick={() => updateExpanded(false)}
              >
                <CiStethoscope style={{ marginBottom: "2px" }} /> Measurement
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item className="nav-title">
              <h1>HekiDesk</h1>
            </Nav.Item>
          </Nav>

          <Nav>
            <Nav.Item className="nav-user-name">
              <BsPersonCircle />{" "}
              <h4 style={{ fontFamily: "cursive" }}> {username} </h4>
            </Nav.Item>
          </Nav>

          <Nav className="ms-auto" defaultActiveKey="#connect">
            <Nav.Item className="connect-btn">
              <Link to="/DeviceConnection">
                <Button className="connect-btn-inner">
                  <AiOutlineLogin style={{ fontSize: "1.2em" }} />
                  {bluetooth.isConnected ? "Connected" : "Connect your device "}
                </Button>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
