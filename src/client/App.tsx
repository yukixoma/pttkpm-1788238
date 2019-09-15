import React, { useState, Fragment } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Button, Col } from "react-bootstrap";
import Router from "./routes/Router";

const App: React.FC = () => {
  const [activeKey, setActiveKey] = useState("home");
  const onLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Fragment>
      <Navbar bg="info" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <i className="fas fa-fire"></i> Hotel California
          </Navbar.Brand>
          <Nav className="mr-auto" activeKey={activeKey}>
            <Nav.Link href="/" eventKey="home">
              <i className="fas fa-home" /> Home Page
            </Nav.Link>
            <Nav.Link href="/section/list" eventKey="area-status">
              <i className="fab fa-fort-awesome" /> Area Status
            </Nav.Link>
            <Nav.Link href="/stat/revenue" eventKey="business-stat">
              <i className="fas fa-chart-line" /> Business Stat
            </Nav.Link>
            <Nav.Link href="/section/create" eventKey="create-section" disabled>
              <i className="far fa-plus-square" /> New Area
            </Nav.Link>
          </Nav>
          <Col sm="2">
            {localStorage.getItem("localLoginInfo") ? (
              <Button variant="light" block onClick={() => onLogout()}>
                <i className="fas fa-sign-out-alt" /> Logout
              </Button>
            ) : (
              <a style={{ textDecoration: "none" }} href="/authorize/login">
                <Button variant="outline-light" block>
                  <i className="fas fa-sign-in-alt" /> Login
                </Button>
              </a>
            )}
          </Col>
        </Container>
      </Navbar>
      <Container style={{ marginTop: 10, marginBottom: 50 }}>
        <Router setActiveKey={setActiveKey} />
      </Container>
      <Navbar bg="dark" variant="dark" fixed="bottom">
        <Container>
          <Col>
            <Navbar.Brand>
              <i className="far fa-user" /> Hà Viết Huy Phát
            </Navbar.Brand>
          </Col>
          <Col className="text-light" style={{ textAlign: "center" }}>
            1788238 &trade;
          </Col>
          <Col>
            <Nav className="justify-content-end">
              <Nav.Link
                active
                target="_blank"
                href="https://github.com/yukixoma/pttkpm-1788238"
              >
                <i className="fab fa-github" /> Project code
              </Nav.Link>
            </Nav>
          </Col>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default App;
