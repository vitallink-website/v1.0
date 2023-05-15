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
import TimeDiagram from "./components/measure/history/timeHistory/TimeDiagram";

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
    isUserSelected: isUserSelected,
    isSignedIn: true,
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
                  element={
                    <Protected {...registery}>
                      <TimeHistory />
                    </Protected>
                  }
                />
                <Route
                  userRegistered
                  path="/Measure/History/TimeHistory/:data"
                  element={
                    <Protected {...registery}>
                      <TimeDiagram />
                    </Protected>
                  }
                />
                <Route
                  userRegistered
                  path="/Measure/History/ParameterHistory/:type/:data"
                  element={
                    <Protected {...registery}>
                      <ParameterDiagram />
                    </Protected>
                  }
                />
                <Route
                  userRegistered
                  path="/Measure/History/ParameterHistory"
                  element={
                    <Protected {...registery}>
                      <ParameterHistory />
                    </Protected>
                  }
                />
                <Route
                  path="/Measure/History"
                  element={
                    <Protected {...registery}>
                      <History />
                    </Protected>
                  }
                />
                <Route
                  userRegistered
                  path="/Measure/Measurement/HeartAndLungSound"
                  element={
                    <Protected {...registery}>
                      <HeartAndLungSound />
                    </Protected>
                  }
                />
                <Route
                  path="/Measure/Measurement/BloodGlucose"
                  element={
                    <Protected {...registery}>
                      <BloodGlucose />
                    </Protected>
                  }
                />
                <Route
                  path="/Measure/Measurement/GalvanicSkinResponse"
                  element={
                    <Protected {...registery}>
                      <GalvanicSkinResponse />
                    </Protected>
                  }
                />
                <Route
                  path="/Measure/Measurement/Oximetry"
                  element={
                    <Protected {...registery}>
                      <Oximetry />
                    </Protected>
                  }
                />
                <Route
                  path="/Measure/Measurement/Temperature"
                  element={
                    <Protected {...registery}>
                      <Temperature />
                    </Protected>
                  }
                />
                <Route
                  path="/Measure/Measurement/Cardiogram/AbnormalityDetection"
                  element={
                    <Protected {...registery}>
                      <AbnormalityDetection />
                    </Protected>
                  }
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
                  element={
                    <Protected {...registery}>
                      <BPWithoutCalibration />
                    </Protected>
                  }
                />
                <Route
                  path="/Measure/Measurement/BloodPressure/BPWithCalibration"
                  element={
                    <Protected {...registery}>
                      <BPWithCalibration />
                    </Protected>
                  }
                />
                <Route
                  path="/Measure/Measurement/BloodPressure/BPWithCalibration/BPCalibrationProcess"
                  element={
                    <Protected {...registery}>
                      <BPCalibrationProcess />
                    </Protected>
                  }
                />
                <Route
                  path="/Measure/Measurement/BloodPressure/BPWithCalibration/BPEstimate"
                  element={
                    <Protected {...registery}>
                      <BPEstimate />
                    </Protected>
                  }
                />
                <Route
                  path="/Measure/Measurement/BloodPressure"
                  element={
                    <Protected {...registery}>
                      <BloodPressure />
                    </Protected>
                  }
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
