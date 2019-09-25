import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  SectionType,
  FloorType,
  RoomTypeType,
  LocalAuthorizedInfoType
} from "datatypes";
import { Container, Jumbotron } from "react-bootstrap";
import FloorInfo from "./SectionInfo/FloorInfo";
import { ApiPath } from "../../../global/ApiPath";
import Axios from "axios";

const SectionInfo: React.FC<SectionInfoProps> = ({ history, setActiveKey }) => {
  setActiveKey("area-status");

  const [floors, setFloors] = useState<FloorType[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomTypeType[]>([]);

  const section = history.location.state as SectionType;
  const localLoginInfo: LocalAuthorizedInfoType = JSON.parse(
    localStorage.getItem("localLoginInfo")
  );

  const isLogin =
    localLoginInfo && localLoginInfo.section_id == section.id ? true : false;

  const fetchData = async () => {
    const floors = await Axios.post(`${ApiPath.floor}/getInfo`, {
      section_id: section.id
    });
    const roomTypes = await Axios.post(`${ApiPath.roomType}/getInfo`);
    setRoomTypes(roomTypes.data);
    setFloors(floors.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container style={{ textAlign: "center" }}>
      <Jumbotron className="bg-info text-light">
        <h1>AREA {section.id} </h1>
      </Jumbotron>
      <br />
      {floors.map(floor => (
        <FloorInfo {...floor} roomTypes={roomTypes} isLogin={isLogin} />
      ))}
    </Container>
  );
};

interface SectionInfoProps extends RouteComponentProps {
  setActiveKey(activeKey: string): void;
}

export default SectionInfo;
