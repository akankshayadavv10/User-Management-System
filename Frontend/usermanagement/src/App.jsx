// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./component/UserForm";
import LoginForm from "./component/LoginForm";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./component/ProtectedRoute";
import AddMember from "./component/AddMember";
import ViewMembers from "./component/ViewMembers";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<UserForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Protected Dashboard Layout with Nested Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* These will be rendered inside <Outlet /> in Dashboard */}
          <Route path="members/add" element={<AddMember />} />
          <Route path="members/view" element={<ViewMembers />} />

          {/* You can add more like this */}
          {/* <Route path="group/add" element={<AddGroup />} /> */}
          {/* <Route path="group/view" element={<ViewGroup />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
