import { Button, Modal, Spinner } from "react-bootstrap";

export const MeasureModal = ({ loading, show, closeModal, autoStart }) => {
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>How to start recording...</Modal.Title>
      </Modal.Header>
      {loading ? (
        <Modal.Body style={{ display: "flex", alignItems: "center" }}>
          Please Hold your finger until plotting starts!
          <Spinner animation="border" />
        </Modal.Body>
      ) : (
        <Modal.Body>
          Put your hand on the device, after calibration it start its process
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={autoStart}>
          Let`s go!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
