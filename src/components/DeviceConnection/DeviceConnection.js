import React, { useContext } from "react";
import { Button } from "react-bootstrap";
// import SyncLoader from "react-spinners/SyncLoader";
import { DeviceContext } from "../../App";

function DeviceConnection() {
  const bluetooth = useContext(DeviceContext);

  return (
    <div className="register-section">
      <h1 style={{ marginBottom: "50px" }}>Device Connection</h1>
      {/* <SyncLoader
        color={"#fff"}
        size={15}
        style={{ display: bluetooth.isConnected ? "block" : "none" }}
      />
      <br /> */}
      <Button onClick={bluetooth.connect} disabled={bluetooth.isConnected}>
        {bluetooth.isConnected ? "Paired!" : "Pair"}
      </Button>
    </div>
  );
}

export default DeviceConnection;
