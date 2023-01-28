import React, { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { DeviceContext } from "../../App";
import Spinner from "react-bootstrap/esm/Spinner";

function DeviceConnection() {
  const bluetooth = useContext(DeviceContext);
  return (
    <div className="register-section">
      <h1 style={{ marginBottom: "50px" }}>Device Connection</h1>
      {bluetooth.loading ? (
        <Spinner />
      ) : (
        <Container
          style={{ display: "grid", maxWidth: "20em", placeItems: "center" }}
        >
          <Button
            onClick={bluetooth.connect}
            disabled={bluetooth.isConnected}
            style={{ width: "min-content" }}
          >
            {bluetooth.isConnected ? "Paired!" : "Pair"}
          </Button>
          {bluetooth.isConnected && (
            <Button onClick={bluetooth.disconnect}>
              Disconnect the device
            </Button>
          )}
        </Container>
      )}
    </div>
  );
}

export default DeviceConnection;
