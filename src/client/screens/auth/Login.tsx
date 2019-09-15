import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { LocalAuthorizedInfoType, AuthorizeInfoType } from "datatypes";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  FormGroup,
  Button
} from "react-bootstrap";
import AlertBanner from "../components/AlertBanner";
import Axios from "axios";
import { Jumbotron } from "react-bootstrap";

const Login: React.FC<LoginProps> = ({ history, setActiveKey }) => {
  setActiveKey("login");
  const [alert, setAlert] = useState({ msg: "", success: false });

  const onLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const postData = {
      username: formData.get("username"),
      password: formData.get("password"),
      role: formData.get("role")
    };

    try {
      const authorize = await Axios.post("/api/authorize/login", postData);
      const authorizedData: AuthorizeInfoType = authorize.data;
      const localLoginInfo: LocalAuthorizedInfoType = {
        id: authorizedData.id,
        role: authorizedData.role,
        section_id: authorizedData.section_id
      };
      localStorage.setItem("localLoginInfo", JSON.stringify(localLoginInfo));
      if (localLoginInfo.role == "manager") {
        history.replace("/stat/revenue");
      } else {
        history.replace("/section/info", {
          id: localLoginInfo.section_id
        });
      }
    } catch (error) {
      setAlert({ msg: error.response.data, success: false });
    }
  };
  return (
    <Container>
      <AlertBanner
        message={alert.msg}
        variant={alert.success ? "success" : "danger"}
      />
      <Jumbotron className="bg-info text-light" style={{ textAlign: "center" }}>
        <h1>Login Page</h1>
      </Jumbotron>
      <Card>
        <Card.Header>
          <h2 className="text-info" style={{ textAlign: "center" }}>
            Login
          </h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={(event: React.FormEvent) => onLogin(event)}>
            <FormGroup as={Row}>
              <Form.Label column sm="3">
                Username
              </Form.Label>
              <Col>
                <Form.Control name="username" required />
              </Col>
            </FormGroup>
            <FormGroup as={Row}>
              <Form.Label column sm="3">
                Password
              </Form.Label>
              <Col>
                <Form.Control name="password" type="password" required />
              </Col>
            </FormGroup>
            <FormGroup as={Row}>
              <Col sm="3">
                <Form.Label>Role</Form.Label>
              </Col>
              <Col>
                <Form.Check
                  type="radio"
                  label="Manager"
                  name="role"
                  value="manager"
                  required
                />
                <Form.Check
                  type="radio"
                  label="Employee"
                  name="role"
                  value="employee"
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup style={{ textAlign: "center" }}>
              <Button variant="outline-info" type="submit">
                Login
              </Button>
            </FormGroup>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

interface LoginProps extends RouteComponentProps {
  setActiveKey(key: string): void;
}

export default Login;
