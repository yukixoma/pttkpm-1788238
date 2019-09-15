import React from "react";
import { Form, Col } from "react-bootstrap";

const Room: React.FC<RoomProps> = props => {
  const { sectionId, floorId, roomId } = props;
  return (
    <Col lg="2">
      <Form id={`${sectionId}-${floorId}-${roomId}`}>
        <Form.Label>Room {`${sectionId}${floorId}${roomId}`}</Form.Label>
        <Form.Control as="select" name="room-type">
          <option value="1">Type 1</option>
          <option value="2">Type 2</option>
          <option value="3">Type 3</option>
        </Form.Control>
      </Form>
    </Col>
  );
};

interface RoomProps {
  sectionId: string;
  floorId: string;
  roomId: string;
}

export default Room;
