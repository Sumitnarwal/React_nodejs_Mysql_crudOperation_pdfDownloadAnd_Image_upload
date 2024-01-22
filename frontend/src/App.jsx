import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Student from "./component/Student";
import CreateStudent from "./component/CreateStudent";
import UpdateStudent from "./component/UpdateStudent";
import LoginSignupForm from "./component/LoginSignupForm";
import Home from "./component/Home";
import Register from "./component/Register";

function App() {
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("isLogin")
  );
  console.log(loginStatus);

  const setLogout = () => {
    localStorage.removeItem("isLogin");
    setLoginStatus(null);
  };

  const setLogin = () => {
    const loginStatus = localStorage.getItem("isLogin");
    setLoginStatus(loginStatus);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {loginStatus !== "1" && (
            <Route path="/" element={<Navigate to="/login" />} />
          )}

          <Route
            path="/login"
            element={<LoginSignupForm setLogin={setLogin} />}
          />
          

          {loginStatus === "1" && (
            <>
              <Route path="/student" element={<Student setLogout={setLogout} />}
              />
              <Route path="/create" element={<CreateStudent />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/update/:id" element={<UpdateStudent />} />
            </>
          )}

          {loginStatus !== "1" && (
            <Route path="/*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
