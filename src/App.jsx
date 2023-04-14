import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home.page";
import LoginPage from "./pages/Login/Login.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={null}>
          <Route index element={<HomePage />} />
          <Route path={"login"} element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
