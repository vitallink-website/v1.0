import React from "react";
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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { DBConfig } from "./components/DBConfig/DBConfig";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  initDB(DBConfig);
  return (
    <div class="first-class">
      <Router>
        <ScrollToTop>
          {" "}
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/CreateUser" element={<CreateUser />} />
              <PrivateRoute
                path="/DeviceConnection"
                element={<DeviceConnection />}
              />
              <PrivateRoute
                path="/Measure/History/TimeHistory"
                element={<TimeHistory />}
              />
              <PrivateRoute
                path="/Measure/History/ParameterHistory"
                element={<ParameterHistory />}
              />
              <PrivateRoute path="/Measure/History" element={<History />} />
              <PrivateRoute
                path="/Measure/Measurement/HeartAndLungSound"
                element={<HeartAndLungSound />}
              />
              <PrivateRoute
                path="/Measure/Measurement/BloodGlucose"
                element={<BloodGlucose />}
              />
              <PrivateRoute
                path="/Measure/Measurement/GalvanicSkinResponse"
                element={<GalvanicSkinResponse />}
              />
              <PrivateRoute
                path="/Measure/Measurement/Oximetry"
                element={<Oximetry />}
              />
              <PrivateRoute
                path="/Measure/Measurement/Temperature"
                element={<Temperature />}
              />
              <PrivateRoute
                path="/Measure/Measurement/Cardiogram/AbnormalityDetection"
                element={<AbnormalityDetection />}
              />{" "}
              <PrivateRoute
                path="/Measure/Measurement/Cardiogram"
                element={<Cardiogram />}
              />
              <PrivateRoute
                path="/Measure/Measurement/BloodPressure/BPWithoutCalibration"
                element={<BPWithoutCalibration />}
              />
              <PrivateRoute
                path="/Measure/Measurement/BloodPressure/BPWithCalibration"
                element={<BPWithCalibration />}
              />
              <PrivateRoute
                path="/Measure/Measurement/BloodPressure/BPWithCalibration/BPCalibrationProcess"
                element={<BPCalibrationProcess />}
              />
              <PrivateRoute
                path="/Measure/Measurement/BloodPressure/BPWithCalibration/BPEstimate"
                element={<BPEstimate />}
              />{" "}
              <PrivateRoute
                path="/Measure/Measurement/BloodPressure"
                element={<BloodPressure />}
              />
              <PrivateRoute
                path="/Measure/Measurement"
                element={<Measurement />}
              />
              <PrivateRoute path="/Measure" element={<Measure />} />
            </Routes>
            <Footer />
          </div>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
