import React from "react";
import { Form, Col, Button } from "react-bootstrap";

const Section: React.FC<SectionProps> = props => {
  const { floorQuantity, onFloorChange, setsectionId } = props;
  return (
    <Form
      id="section"
      encType="multipart/form-data"
      name="section"
      method="post"
    >
      <Form.Row>
        <Col lg="2">
          <Form.Label>
            <h3>Section</h3>
          </Form.Label>
        </Col>
        <Col lg="4">
          <Form.Control
            name="section-id"
            placeholder="Section name"
            required
            value={props.sectionId}
            onChange={(e: any) => setsectionId(e.target.value)}
          />
        </Col>
        <Col lg="2">
          <Form.Label>Floor Quantity</Form.Label>
        </Col>
        <Col>
          <Form.Control name="floor-quantity" value={floorQuantity} required />
        </Col>
        <Col>
          <Button
            block
            variant="outline-danger"
            onClick={() => onFloorChange(false)}
          >
            Desrease
          </Button>
        </Col>
        <Col>
          <Button
            block
            variant="outline-success"
            onClick={() => onFloorChange(true)}
          >
            Increase
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

interface SectionProps {
  sectionId: string;
  setsectionId: Function;
  onFloorChange: Function;
  floorQuantity: string;
}

export default Section;
