import React, { createContext, useMemo } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import About from "./components/About/About";
import Measure from "./components/measure/Measure";
import Measurement from "./components/measure/measurement/Measurement";
import History from "./components/measure/history/History";
import Register from "./components/Register/Register";
import CreateUser from "./components/CreateUser/CreateUser";
import DeviceConnection from "./components/DeviceConnection/DeviceConnection";
import TimeHistory from "./components/measure/history/timeHistory/TimeHistory";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BloodGlucose from "./components/measure/parameter/bloodGlucose/BloodGlucose";
import BloodPressure from "./components/measure/parameter/bloodPressure/BloodPressure";
import Cardiogram from "./components/measure/parameter/cardiogram/Cardiogram";
import GalvanicSkinResponse from "./components/measure/parameter/galvanicSkinResponse/GalvanicSkinResponse";
import Oximetry from "./components/measure/parameter/oximetry/Oximetry";
import Temperature from "./components/measure/parameter/temperature/Temperature";
import HeartAndLungSound from "./components/measure/parameter/heartAndLongSound/HeartAndLungSound";
import AbnormalityDetection from "./components/measure/parameter/cardiogram/AbnormalityDetection";
import BPWithoutCalibration from "./components/measure/parameter/bloodPressure/BPWithoutCalibration";
import BPWithCalibration from "./components/measure/parameter/bloodPressure/BPWithCalibration";
import BPCalibrationProcess from "./components/measure/parameter/bloodPressure/BPCalibrationProcess";
import BPEstimate from "./components/measure/parameter/bloodPressure/BPEstimate";
import ParameterHistory from "./components/measure/history/parameterHistory/ParameterHistory";
import { initDB } from "react-indexed-db";
import { DBUser } from "./components/DBConfig/DBConfig";
import Protected from "./components/PrivateRoute";
import { useSignalFeed } from "./utilities/bluetooth";
import UserInfo from "./utilities/UserInfo";
import ParameterDiagram from "./components/measure/history/parameterHistory/ParameterDiagram";

export const DeviceContext = createContext({});
export const UserContext = createContext({});

initDB(DBUser);

function App() {
  const { isConnected, ...rest } = useSignalFeed();

  const bluetooth = useMemo(() => {
    return {
      ...rest,
      isConnected,
    };
  }, [isConnected, rest]);

  const { isUserSelected, ...user } = UserInfo();

  const registery = {
    isUserSelected: true,
    isSignedIn: true ,
  };

  return (
    <div className="first-class">
      <Router>
        <DeviceContext.Provider value={bluetooth}>
          <UserContext.Provider value={{ isUserSelected, ...user }}>
            <div className="App">
              <Navbar username={user.username} />
              <Routes>
                <Route path="/About" element={<About />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/CreateUser" element={<CreateUser />} />
                <Route
                  path="/DeviceConnection"
                  element={<DeviceConnection />}
                />
                <Route
                  path="/Measure/History/TimeHistory"
                  element={<TimeHistory />}
                />
                <Route
                  userRegistered
                  path="/Measure/History/ParameterHistory/:type"
                  element={<ParameterDiagram />}
                />
                <Route
                  userRegistered
                  path="/Measure/History/ParameterHistory"
                  element={<ParameterHistory />}
                />
                <Route path="/Measure/History" element={<History />} />
                <Route
                  userRegistered
                  path="/Measure/Measurement/HeartAndLungSound"
                  element={<HeartAndLungSound />}
                />
                <Route
                  path="/Measure/Measurement/BloodGlucose"
                  element={<BloodGlucose />}
                />
                <Route
                  path="/Measure/Measurement/GalvanicSkinResponse"
                  element={<GalvanicSkinResponse />}
                />
                <Route
                  path="/Measure/Measurement/Oximetry"
                  element={<Oximetry />}
                />
                <Route
                  path="/Measure/Measurement/Temperature"
                  element={<Temperature />}
                />
                <Route
                  path="/Measure/Measurement/Cardiogram/AbnormalityDetection"
                  element={<AbnormalityDetection />}
                />{" "}
                <Route
                  path="/Measure/Measurement/Cardiogram"
                  element={
                    <Protected {...registery}>
                      <Cardiogram />
                    </Protected>
                  }
                />
                <Route
                  path="/Measure/Measurement/BloodPressure/BPWithoutCalibration"
                  element={<BPWithoutCalibration />}
                />
                <Route
                  path="/Measure/Measurement/BloodPressure/BPWithCalibration"
                  element={<BPWithCalibration />}
                />
                <Route
                  path="/Measure/Measurement/BloodPressure/BPWithCalibration/BPCalibrationProcess"
                  element={<BPCalibrationProcess />}
                />
                <Route
                  path="/Measure/Measurement/BloodPressure/BPWithCalibration/BPEstimate"
                  element={<BPEstimate />}
                />{" "}
                <Route
                  path="/Measure/Measurement/BloodPressure"
                  element={<BloodPressure />}
                />
                <Route path="/Measure/Measurement" element={<Measurement />} />
                <Route
                  path="/Measure"
                  element={
                    <Protected {...registery}>
                      <Measure />
                    </Protected>
                  }
                />
                <Route path="/" element={<Home {...registery} />} />
              </Routes>
              <Footer />
            </div>
          </UserContext.Provider>
        </DeviceContext.Provider>
        <ScrollToTop />
      </Router>
    </div>
  );
}

export default App;
