import React from "react";
import NavbarOffcanvas from "./NavbarOffcanvas";
import Routes from "./Routes";
import { Container, Row, Col } from 'react-bootstrap';
import "./Layout.css";

function Layout() {
  return (
    <Container fluid>
      <Row>
        <Col className="side-bar">

          <NavbarOffcanvas/>
          
        </Col>
        <Col>

          <Routes/>

        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;
