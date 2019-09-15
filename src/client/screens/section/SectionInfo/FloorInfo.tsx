import React, { useState, useEffect } from "react";
import { FloorType, RoomType, RoomTypeType } from "datatypes";
import axios from "axios";
import { Jumbotron, Row } from "react-bootstrap";
import RoomInfo from "./RoomInfo";

const FloorInfo: React.FC<FloorInfoProps> = props => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const { section_id, id, roomTypes, isLogin } = props;
  useEffect(() => {
    axios
      .post("/api/room/getInfo", { section_id: section_id, floor_id: id })
      .then(res => {
        const data = res.data as RoomType[];
        setRooms(data);
      });
  }, []);
  return (
    <Jumbotron style={{ textAlign: "left" }}>
      <h3>Floor {id}</h3>
      <br />
      <Row className="justify-content-center" style={{ textAlign: "center" }}>
        {rooms.map(room => (
          <RoomInfo roomInfo={room} roomTypes={roomTypes} isLogin={isLogin} />
        ))}
      </Row>
    </Jumbotron>
  );
};

interface FloorInfoProps extends FloorType {
  roomTypes: RoomTypeType[];
  isLogin: boolean;
}

export default FloorInfo;
