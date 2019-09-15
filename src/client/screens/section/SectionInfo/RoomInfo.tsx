import React from "react";
import { RoomType, RoomTypeType } from "datatypes";
import { Col, Card, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomInfo: React.FC<RoomInfoProps> = props => {
  const { roomTypes, roomInfo, isLogin } = props;
  const { section_id, floor_id, id } = roomInfo;
  const roomType = roomTypes.find(type => type.id === props.roomInfo.type);

  return (
    <Col lg="3" style={{ marginBottom: 5 }}>
      <Card>
        <Card.Header> {section_id + floor_id + id}</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <p className="text-success">{roomType.capacity} persons</p>
            <p className="text-danger">$ {roomType.price}</p>
          </ListGroup.Item>
          <FunctionButton
            roomInfo={roomInfo}
            roomType={roomType}
            isLogin={isLogin}
          />
        </ListGroup>
      </Card>
    </Col>
  );
};

const FunctionButton: React.FC<FunctionButtonProps> = props => {
  const { isLogin, roomInfo } = props;
  if (isLogin)
    return (
      <ListGroup.Item>
        {roomInfo.availability == 1 ? (
          <Link
            to={{
              pathname: "/room/checkin",
              state: props
            }}
            style={{ textDecoration: "none" }}
          >
            <Button variant="outline-success" block>
              Check-in
            </Button>
          </Link>
        ) : (
          <Link
            to={{
              pathname: "/room/checkout",
              state: props
            }}
            style={{ textDecoration: "none" }}
          >
            <Button variant="outline-danger" block>
              Check-out
            </Button>
          </Link>
        )}
      </ListGroup.Item>
    );
  else
    return (
      <ListGroup.Item>
        {roomInfo.availability ? (
          <Button variant="success" block disabled>
            Available
          </Button>
        ) : (
          <Button variant="warning" block disabled>
            Reserved
          </Button>
        )}
      </ListGroup.Item>
    );
};

interface FunctionButtonProps {
  isLogin: boolean;
  roomType: RoomTypeType;
  roomInfo: RoomType;
}

interface RoomInfoProps {
  roomTypes: RoomTypeType[];
  roomInfo: RoomType;
  isLogin: boolean;
}

export default RoomInfo;
