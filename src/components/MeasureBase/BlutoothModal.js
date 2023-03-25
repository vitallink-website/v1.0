import { Row, Col, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
  
export const BlutoothModal = ({show, closeModal}) => {
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>The device is disconnected</Modal.Title>
      </Modal.Header>
      
    <Modal.Body style={{ display: "flex", alignItems: "center" }}>
        Click on the below link to connect your device
    </Modal.Body> 
      <Modal.Footer>
          <Col xs={{ span: 5 }}>
            <Button  onClick={closeModal}>
              Close
            </Button>
          </Col>
          <Col xs={{ span: 6 }}>
            <Link to="/DeviceConnection">
                <Button >
                connect your device
                </Button>
            </Link>
          </Col>
      </Modal.Footer>
    </Modal>
  );
};
