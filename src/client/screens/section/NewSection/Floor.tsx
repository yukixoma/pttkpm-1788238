import React, { useState } from "react";
import { Form, Jumbotron, Col, Row, Button } from "react-bootstrap";
import Room from "./Room";

const Floor: React.FC<FloorProps> = props => {
  const { sectionId, floorId } = props;
  const [roomQuantity, setRoomQuantity] = useState(4);
  const onRoomChange = (isPlus: boolean) => {
    if (isPlus) setRoomQuantity(roomQuantity + 1);
    else {
      if (roomQuantity - 1 > 0) setRoomQuantity(roomQuantity - 1);
    }
  };
  const MultipleRoom = [];
  for (let i = 1; i <= roomQuantity; i++) {
    MultipleRoom.push(<Room {...props} roomId={i.toString()} key={i} />);
  }
  return (
    <Jumbotron style={{ textAlign: "left" }}>
      <Form id={`${sectionId}-${floorId}`}>
        <Form.Row>
          <Col lg="2">
            <Form.Label>
              <h4>Floor {props.floorId}</h4>
            </Form.Label>
          </Col>
          <Col lg="4" />
          <Col lg="2">
            <Form.Label>Floor Quantity</Form.Label>
          </Col>
          <Col>
            <Form.Control
              name="room-quantity"
              value={roomQuantity.toString()}
            />
          </Col>
          <Col>
            <Button
              block
              variant="outline-danger"
              onClick={() => onRoomChange(false)}
            >
              Desrease
            </Button>
          </Col>
          <Col>
            <Button
              block
              variant="outline-success"
              onClick={() => onRoomChange(true)}
            >
              Increase
            </Button>
          </Col>
        </Form.Row>
      </Form>
      <Row>{MultipleRoom}</Row>
    </Jumbotron>
  );
};

interface FloorProps {
  sectionId: string;
  floorId: string;
}

export default Floor;
