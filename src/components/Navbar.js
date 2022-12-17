import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { ImBlog } from "react-icons/im";
import {
  CiRuler,
  AiOutlineHome,
  AiOutlineUser,
} from "react-icons/ai";
import {
  CiStethoscope
}from "react-icons/ci";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

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
            <Nav.Item className = "NavTitle">
              <h1>HekiDesk</h1>
            </Nav.Item>
          </Nav>
          <Nav className="ms-auto" defaultActiveKey="#connect">
            <Nav.Item className="connect-btn">
              <Button href="/DeviceConnection" className="connect-btn-inner">
                <AiOutlineLogin style={{ fontSize: "1.2em" }} />
                {" Connect your device "}
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
