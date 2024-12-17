import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar as BootstrapNavbar, Nav, NavDropdown } from 'react-bootstrap'; // Import necessary Bootstrap components
import './Navbar.css';  // Import custom styles

function Navbar({ isLoggedIn, onLogout }) {
  const token = localStorage.getItem("token");

  return (
    <BootstrapNavbar expand="lg" className="bg-body-tertiary custom-navbar">
      <Container>
        <BootstrapNavbar.Brand href="#home" className="custom-brand">A'TIN Universe</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
