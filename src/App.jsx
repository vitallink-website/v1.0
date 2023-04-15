import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home.page";
import LoginPage from "./pages/Login/Login.page";
import RegisterPage from "./pages/RegisterUser/Register.page";
import RegisterDevicePage from "./pages/RegisterDevice/RegisterDevice.page";
import Sidebar from "./pages/Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import Measurement from "./pages/measurement/measurement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={null}>
          <Route index element={<HomePage />} />
          <Route path={"login"} element={<LoginPage />} />
          <Route path={"register-user"} element={<RegisterPage />} />
          <Route path={"register-device"} element={<RegisterDevicePage />} />
          <Route path={"measurement"} element={<Measurement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
