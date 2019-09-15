import React, { useState } from "react";

import { Container, Button } from "react-bootstrap";
import PostData from "./NewSection/PostData";
import Section from "./NewSection/Section";
import Floor from "./NewSection/Floor";
import AlertBanner from "../components/AlertBanner";

const NewSection: React.FC<NewSectionProps> = props => {
  props.setActiveKey("create-section");

  const [sectionId, setsectionId] = useState("A");
  const [floorQuantity, setFloorQuantity] = useState(4);
  const [alert, setAlert] = useState({ msg: "", success: true });
  const MutipleFloor = [];

  const onFloorChange = (isPlus: boolean) => {
    if (isPlus) setFloorQuantity(floorQuantity + 1);
    else {
      if (floorQuantity - 1 > 0) setFloorQuantity(floorQuantity - 1);
    }
  };

  for (let i = 1; i <= floorQuantity; i++) {
    MutipleFloor.push(
      <Floor sectionId={sectionId} floorId={i.toString()} key={i} />
    );
  }

  const onPostData = async () => {
    const alert = await PostData();
    setAlert(alert);
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <AlertBanner
        variant={alert.success ? "success" : "danger"}
        message={alert.msg}
      />
      <h2>Create New Section</h2>
      <br />
      <Section
        sectionId={sectionId}
        setsectionId={setsectionId}
        onFloorChange={onFloorChange}
        floorQuantity={floorQuantity.toString()}
      />
      <br />
      {MutipleFloor}
      <br />
      <Button variant="warning" onClick={() => onPostData()}>
        Submit
      </Button>
    </Container>
  );
};

interface NewSectionProps {
  setActiveKey(activekey: string): void;
}

export default NewSection;
