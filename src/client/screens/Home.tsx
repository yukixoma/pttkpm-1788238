import React, { useEffect, useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Container, Jumbotron, Button } from "react-bootstrap";

const Home: React.SFC<HomeProps> = ({ setActiveKey }) => {
  setActiveKey("home");

  return (
    <Container style={{ textAlign: "center" }}>
      <Jumbotron className="bg-info text-light">
        <h1>Welcome to our hotel!</h1>
      </Jumbotron>
      <Jumbotron>
        <Link to="/section/list">
          <Button>Check room status!</Button>
        </Link>
      </Jumbotron>
    </Container>
  );
};

interface HomeProps extends RouteComponentProps<{}> {
  setActiveKey: any;
}
export default Home;
