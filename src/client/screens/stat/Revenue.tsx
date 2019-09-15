import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { YearRevenueType, LocalAuthorizedInfoType } from "datatypes";
import {
  Container,
  Card,
  Table,
  Button,
  Row,
  Col,
  Form,
  Jumbotron
} from "react-bootstrap";
import AlertBanner from "../components/AlertBanner";
import Redirect from "../components/Redirect";
import Axios from "axios";

const Revenue: React.FC<RevenueProps> = props => {
  const localLoginInfo: LocalAuthorizedInfoType = JSON.parse(
    localStorage.getItem("localLoginInfo")
  );
  if (localLoginInfo && localLoginInfo.role == "manager")
    return <YearRevenue {...props} />;
  else return <Redirect path="/authorize/login" {...props} />;
};

const YearRevenue: React.FC<RevenueProps> = props => {
  props.setActiveKey("business-stat");

  const [revenue, setRevenue] = useState<YearRevenueType>(null);
  const [year, setYear] = useState("2019");
  const [alert, setAlert] = useState({ msg: "", success: false });
  const fetchData = async (year: string) => {
    try {
      const res = await Axios.post("/api/manager/yearRevenue", { year: year });
      const data = res.data as YearRevenueType;
      setYear(year);
      if (data) {
        setAlert({ msg: "", success: true });
        setRevenue(data);
      } else {
        setRevenue(null);
        setAlert({ msg: "Information not found", success: false });
      }
    } catch (error) {
      setAlert({ msg: error.response.data, success: false });
      console.log(error);
    }
  };
  useEffect(() => {
    const curYear = new Date().getFullYear().toString();
    fetchData(curYear);
  }, []);

  const onYearSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    fetchData(formData.get("year") as string);
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <AlertBanner
        headerMessage={alert.success ? "Success" : "Error"}
        message={alert.msg}
        variant={alert.success ? "success" : "danger"}
      />
      <Jumbotron className="bg-info text-light" style={{ textAlign: "center" }}>
        <h1>Bussiness Stat</h1>
      </Jumbotron>
      <Jumbotron>
        <Form onSubmit={(event: React.FormEvent) => onYearSubmit(event)}>
          <Form.Group as={Row}>
            <Col sm="8">
              <Form.Control placeholder="Enter year" name="year" />
            </Col>
            <Col>
              <Button type="submit" block>
                <i className="fas fa-search" /> Search
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Jumbotron>
      {revenue ? (
        <Card>
          <Card.Header>
            <h1 className="text-info">{year} REVENUE</h1>
          </Card.Header>
          <Card.Body>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Percentage</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {revenue.month.map((month, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{((month / revenue.total) * 100).toFixed(2)} %</td>
                    <td>{month}</td>
                  </tr>
                ))}
                <tr className="text-danger">
                  <th>Total</th>
                  <th></th>
                  <th>{revenue.total}</th>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ) : null}
    </Container>
  );
};

interface RevenueProps extends RouteComponentProps {
  setActiveKey(activeKey: string): void;
}

export default Revenue;
