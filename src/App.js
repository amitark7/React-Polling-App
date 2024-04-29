import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import UserList from "./pages/UserList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PollsPage from "./pages/PollsPage";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./utils/PrivateRoute";
import AddEditPoll from "./pages/AddEditPoll";

function App() {
  return (
    <>
      <Navbar />
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
          element={
            <PrivateRoute Component={AddEditPoll} redirectTo="/addPoll" />
          }
        />
        <Route
          path="/editPoll/:id"
          element={
            <PrivateRoute Component={AddEditPoll} redirectTo="/editPoll" />
          }
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
