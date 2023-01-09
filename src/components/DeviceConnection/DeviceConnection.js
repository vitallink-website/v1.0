import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { DeviceContext } from "../../App";
import Spinner from "react-bootstrap/esm/Spinner";

function DeviceConnection() {
  const bluetooth = useContext(DeviceContext);
  return (
    <div className="register-section">
      <h1 style={{ marginBottom: "50px" }}>Device Connection</h1>
      {bluetooth.loading && <Spinner />}
      <Button onClick={bluetooth.connect} disabled={bluetooth.isConnected}>
        {bluetooth.isConnected ? "Paired!" : "Pair"}
      </Button>
      {bluetooth.isConnected && (
        <Button onClick={bluetooth.disconnect}>Disconnect the device</Button>
      )}
    </div>
  );
}

export default DeviceConnection;
