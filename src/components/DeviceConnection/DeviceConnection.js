import React, { useState } from "react";
import { Button } from "react-bootstrap";
import SyncLoader from "react-spinners/SyncLoader";

function DeviceConnection() {
  const [showSymbol, changeShowSymbol] = useState(0);

  return (
    <div class="register-section">
      <h1 style={{ marginBottom: "50px" }}>Device Connection</h1>
      <SyncLoader
        color={"#fff"}
        size={15}
        style={{ display: showSymbol ? "block" : "none" }}
      />
      <br />
      <Button onClick={() => changeShowSymbol(true)}>Pair</Button>
    </div>
  );
}

export default DeviceConnection;
