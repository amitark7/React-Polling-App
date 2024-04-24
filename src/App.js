import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import UserList from "./pages/UserList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PollsPage from "./pages/PollsPage";
import AddPoll from "./pages/AddPoll";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userFetch = JSON.parse(localStorage.getItem("user"));
    if (userFetch) {
      setIsLoggedIn(true);
    }
  }, [location]);

  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute Component={Login} redirectTo="/" />}
        />
        <Route
          path="/signup"
          element={<PrivateRoute Component={Signup} redirectTo="/signup" />}
        />
        <Route
          path="/polling"
          element={<PrivateRoute Component={PollsPage} redirectTo="/polling" />}
        />
        <Route
          path="/addPoll"
          element={<PrivateRoute Component={AddPoll} redirectTo="/addPoll" />}
        />
        <Route
          path="/createUser"
          element={<PrivateRoute Component={Signup} redirectTo="/createUser" />}
        />

        <Route
          path="/users"
          element={<PrivateRoute Component={UserList} redirectTo="/users" />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
