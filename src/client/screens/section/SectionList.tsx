import React, { useEffect, useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { SectionType } from "datatypes";
import { Container, Jumbotron, Button, Row, Col } from "react-bootstrap";
import Axios from "axios";

const SectionList: React.SFC<HomeProps> = ({ history, setActiveKey }) => {
  setActiveKey("area-status");

  const [sections, setSections] = useState<SectionType[]>([]);
  useEffect(() => {
    Axios.post("/api/section/getAll")
      .then(res => {
        const data = res.data as SectionType[];
        setSections(data);
      })
      .catch(e => console.log(e));
  }, []);

  const onSection = (sectionId: string) => {
    history.push(`/section/info/${sectionId}`);
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <Jumbotron className="bg-info text-light">
        <h1>Area List</h1>
      </Jumbotron>
      <br />
      <Jumbotron>
        <Row className="justify-content-md-center">
          {sections.map(section => (
            <Col sm="4">
              <Link
                to={{
                  pathname: `/section/info`,
                  state: section
                }}
                style={{ textDecoration: "none" }}
              >
                <Button block variant="outline-info">
                  Area {section.id}
                </Button>
              </Link>
            </Col>
          ))}
        </Row>
      </Jumbotron>
    </Container>
  );
};

interface HomeProps extends RouteComponentProps<{}> {
  setActiveKey(activekey: string): void;
}
export default SectionList;
