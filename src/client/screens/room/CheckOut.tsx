import React, { useState, useEffect } from "react";
import { RouteComponentProps as RCP, Link } from "react-router-dom";
import { LocalAuthorizedInfoType, RoomType } from "datatypes";
import { GetDiffDays as GetStayDays } from "../../../library/GetDiffDays";
import { CheckInOutType } from "datatypes";
import { Container, Card, ListGroup, Row, Col, Button } from "react-bootstrap";
import AlertBanner from "../components/AlertBanner";
import Redirect from "../components/Redirect";
import { ApiPath } from "../../../global/ApiPath";
import Axios from "axios";

const CheckOut: React.FC<RCP> = props => {
  const localLoginInfo: LocalAuthorizedInfoType = JSON.parse(
    localStorage.getItem("localLoginInfo")
  );
  const { state } = props.history.location;
  const roomInfo = state.roomInfo as RoomType;

  if (
    localLoginInfo &&
    localLoginInfo.role == "employee" &&
    localLoginInfo.section_id == state.roomInfo.section_id
  )
    return <CheckOutView roomInfo={roomInfo} />;
  else return <Redirect {...props} path="authorize/login" />;
};

const CheckOutView: React.FC<CheckOutView> = props => {
  const [checkoutInfo, setCheckoutInfo] = useState<CheckInOutType>(null);
  const [alert, setAlert] = useState({ msg: "", success: false });
  const { section_id, floor_id, id } = props.roomInfo;

  useEffect(() => {
    Axios.post(`${ApiPath.checkInOut}/getInfo`, {
      section_id,
      floor_id,
      room_id: id,
      is_check_out: 0
    })
      .then(res => {
        if (res.data) setCheckoutInfo(res.data);
        else setAlert({ msg: "Info not found", success: false });
      })
      .catch(err => setAlert({ msg: err.response.data, success: false }));
  }, []);

  // Check out
  const onCheckOut = async () => {
    try {
      // Release room
      const room = await Axios.post(`${ApiPath.room}/checkout`, {
        section_id: section_id,
        floor_id: floor_id,
        id: id
      });
      setAlert({ msg: room.data, success: true });

      // Check out
      const checkoutRes = await Axios.post(`${ApiPath.checkInOut}/checkout`, {
        section_id: checkoutInfo.section_id,
        floor_id: checkoutInfo.floor_id,
        room_id: checkoutInfo.room_id,
        id: checkoutInfo.id,
        start_date: checkoutInfo.start_date,
        price: checkoutInfo.price,
        is_check_out: 0
      });
      setAlert({ msg: checkoutRes.data, success: true });
    } catch (error) {
      setAlert({ msg: error.response.data, success: false });
      console.log(error);
    }
  };
  return (
    <Container style={{ textAlign: "center" }}>
      <AlertBanner
        message={alert.msg}
        variant={alert.success ? "success" : "danger"}
      />
      {checkoutInfo !== null ? (
        <Card>
          <Card.Header>
            <h3 className="text-success">
              {`Check out (${section_id}${floor_id}${id})`}
            </h3>
          </Card.Header>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col sm="6">Start date</Col>
                <Col sm="6">{checkoutInfo.start_date}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col sm="6">End date</Col>
                <Col sm="6">Today</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col sm="6">Stay</Col>
                <Col sm="6">
                  {`${GetStayDays(
                    new Date(),
                    new Date(checkoutInfo.start_date)
                  )} day(s)`}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col sm="6">Total Price</Col>
                <Col sm="6">
                  {`$ ${GetStayDays(
                    new Date(),
                    new Date(checkoutInfo.start_date)
                  ) * checkoutInfo.price}`}
                </Col>
              </Row>
            </ListGroup.Item>

            {/* Function button */}
            <ListGroup.Item>
              {alert.success ? (
                <Link
                  to={{
                    pathname: "/section/info",
                    state: { id: section_id }
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="outline-success" block>
                    OK
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline-danger"
                  block
                  onClick={() => onCheckOut()}
                >
                  Check out
                </Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      ) : null}
    </Container>
  );
};

interface CheckOutView {
  roomInfo: RoomType;
}

export default CheckOut;
