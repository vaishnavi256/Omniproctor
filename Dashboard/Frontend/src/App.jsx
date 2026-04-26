// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ActiveTests from "./pages/ActiveTest";
import ViewTest from "./pages/ViewTest";
import CreateTest from "./pages/CreateTest";
import Home from "./pages/Home";
import SuspiciousActivities from "./pages/SuspiciousActivities";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element= {<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
              <Dashboard />
          }
        />
        <Route path="/active" element={<ActiveTests />} />
        <Route path="/view/:id" element={<ViewTest />} />
        <Route path="/create" element={<CreateTest />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/logs" element= {<SuspiciousActivities/>} />
      </Routes>
    </Router>
  );
}

export default App;
