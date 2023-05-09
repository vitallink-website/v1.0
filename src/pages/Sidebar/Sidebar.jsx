import React, {useState} from "react";
import LogoImg from "../../assets/icon/logo.svg";
import Home from "../../assets/icon/home.svg";
import MyDesk from "../../assets/icon/myDesk.svg";
import HistoryLogo from "../../assets/icon/history.svg";
import Measurement from "../../assets/icon/3D.svg";
import "../../assets/styles/Sidebar.css";

export default function Sidebar() {
  const [click, setClick] = React.useState(false);
  const handleClick = () => setClick(!click);


  return (
      <div
        className={click ? "sidebar-container" : "sidebar-container expanded"}
      >
        <div className="SlickBar">
          <div className="logo">
            <img src={LogoImg} alt="logo" width="30" />
            <div className="logo-text" >
              Hekidesk
            </div>
          </div>
          <div className="sidebar-item">
            <a
              onClick={() => setClick(false)}
              to="/"
            >
              <img src={Home} alt="logo" width="25" />
              <div className= "sidebar-text">
                Home
              </div>
            </a>
            <a
              onClick={() => setClick(false)}
              to="/"
            >
              <img src={MyDesk} alt="logo" width="25" />
              <div className= "sidebar-text">
                My Desk
              </div>
            </a>
            <a
              onClick={() => setClick(false)}
              to="/"
            >
              <img src={Measurement} alt="logo" width="25" />
              <div className= "sidebar-text">
                Measurement
              </div>
            </a>
            <a
              onClick={() => setClick(false)}
              to="/"
            >
              <img src={HistoryLogo} alt="logo" width="25" />
              <div className= "sidebar-text">
                History
              </div>
            </a>            
          </div>
        </div>
      </div>

  );
}
