import React, { useState } from "react";
import { RouteComponentProps as RCP, Link } from "react-router-dom";
import {
  BookingNoteType,
  RoomType,
  RoomTypeType,
  LocalAuthorizedInfoType
} from "datatypes";
import {
  Button,
  Container,
  Card,
  Form,
  Row,
  Col,
  Jumbotron
} from "react-bootstrap";
import AlertBanner from "../components/AlertBanner";
import Redirect from "../components/Redirect";
import Axios from "axios";

const Checkin: React.FC<RCP> = props => {
  const localLoginInfo: LocalAuthorizedInfoType = JSON.parse(
    localStorage.getItem("localLoginInfo")
  );
  const { section_id } = props.history.location.state.roomInfo;
  if (localLoginInfo && localLoginInfo.section_id == section_id)
    return <CheckinView {...props} />;
  else return <Redirect {...props} path="/authorize/login" />;
};

const CheckinView: React.FC<RCP> = ({ history }) => {
  const [alert, setAlert] = useState({ msg: "", success: false });
  const { state } = history.location;
  const roomInfo: RoomType = state.roomInfo;
  const { section_id, floor_id, id } = roomInfo;
  const roomType: RoomTypeType = state.roomType;

  // Post checkin-request to server
  const onCheckin = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);

    try {
      const bookingNote = {} as BookingNoteType;

      for (const pair of form.entries()) {
        if (pair[1] == "")
          bookingNote[pair[0]] = JSON.stringify(form.getAll(pair[0]));
        else bookingNote[pair[0]] = pair[1];
      }

      const start_date = new Date(form.get("start_date") as string);
      const expect_end = new Date(form.get("expect_end") as string);

      if (start_date > expect_end) {
        setAlert({
          msg: "Expect end date must be after Start date",
          success: false
        });
      } else {
        // Post room info to server
        const room = {
          section_id: section_id,
          floor_id: floor_id,
          id: id
        };
        const roomRes = await Axios.post("/api/room/checkin", room);
        setAlert({ msg: roomRes.data, success: true });

        // Post booking note info to server
        bookingNote.expect_end = expect_end.toDateString();
        bookingNote.check_out = 0;
        const bookingNoteRes = await Axios.post(
          "/api/booking-note/checkin",
          bookingNote
        );
        setAlert({ msg: bookingNoteRes.data, success: true });
      }
    } catch (error) {
      setAlert({ msg: error.response.data, success: false });
    }
  };

  // Create customer list depend on room capacity
  const CustomerList = () => {
    const customerList = [];
    for (let i = 0; i < roomType.capacity; i++) {
      const required = i === 0 ? true : false;
      customerList.push(
        <Form.Group as={Row}>
          <Col sm="6">
            <Form.Label>Fullname</Form.Label>
            <Form.Control name="customer_fullname" required={required} />
          </Col>
          <Col sm="6">
            <Form.Label>ID No.</Form.Label>
            <Form.Control name="customer_id" required={required} />
          </Col>
        </Form.Group>
      );
    }
    return customerList;
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <AlertBanner
        message={alert.msg}
        variant={alert.success ? "success" : "danger"}
      />
      <Jumbotron className="bg-info text-light" style={{ textAlign: "center" }}>
        <h1>Check-in</h1>
      </Jumbotron>
      <Card>
        <Card.Header>
          <h3 className="text-danger">{`Rom ${section_id}${floor_id}${id}`}</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={(event: React.FormEvent) => onCheckin(event)}>
            {/* Room Info */}
            <Form.Group as={Row}>
              <Form.Label column sm="12">
                <h5 className="text-success">Room Info</h5>
              </Form.Label>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Area
              </Form.Label>
              <Col sm="10">
                <Form.Control name="section_id" value={section_id} readOnly />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Floor
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="floor_id"
                  value={floor_id.toString()}
                  readOnly
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Room
              </Form.Label>
              <Col sm="10">
                <Form.Control name="room_id" value={id.toString()} readOnly />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Price
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="price"
                  value={roomType.price.toString()}
                  readOnly
                />
              </Col>
            </Form.Group>

            {/* Datetime Info */}
            <Form.Group as={Row}>
              <Form.Label column sm="12">
                <h5 className="text-primary">Date</h5>
              </Form.Label>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Start date
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  value={new Date().toDateString()}
                  name="start_date"
                  readOnly
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Expect end date
              </Form.Label>
              <Col sm="10">
                <Form.Control type="date" name="expect_end" required />
              </Col>
            </Form.Group>

            {/* Customer info */}
            <Form.Group as={Row}>
              <Form.Label column sm="12">
                <h5 className="text-warning">Customer List</h5>
              </Form.Label>
            </Form.Group>
            {/* Customer input list */}
            {CustomerList()}

            {/* Function button */}
            {alert.success ? (
              <Link
                to={{
                  pathname: "/section/info",
                  state: {
                    id: section_id
                  }
                }}
                style={{ textDecoration: "none" }}
              >
                <Button variant="outline-success" block>
                  OK
                </Button>
              </Link>
            ) : (
              <Button type="submit" variant="outline-info" block>
                Check-in
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Checkin;
