import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/users" element={<UserList />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;