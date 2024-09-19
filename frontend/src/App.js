// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext'; // Auth context
import Navbar from './components/Navbar'; // Navbar component
import Login from './components/Auth/Login'; // Login component
import Register from './components/Auth/Register'; // Register component
import TaskList from './components/TaskList'; // Task list component
import CreateTask from './components/CreateTask'; // Task creation component
import AdminPanel from './components/AdminPanel'; // Admin panel component
import PrivateRoute from './components/PrivateRoute'; // Private route component

const App = () => {
  const { user } = useContext(AuthContext); // Get user from AuthContext

  return (
    <Router>
      <Navbar /> {/* Include the Navbar in the layout */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes - For authenticated users */}
        <Route
          path="/tasks"
          element={user ? <PrivateRoute><TaskList /></PrivateRoute> : <Navigate to="/login" />}
        />
        <Route
          path="/create-task"
          element={user ? <PrivateRoute><CreateTask /></PrivateRoute> : <Navigate to="/login" />}
        />

        {/* Admin Route - Only accessible by admins */}
        <Route
          path="/admin"
          element={user && user.role === 'admin' ? <PrivateRoute role="admin"><AdminPanel /></PrivateRoute> : <Navigate to="/not-authorized" />}
        />

        {/* Fallback for unauthorized access */}
        <Route path="/not-authorized" element={<h2>Not authorized to view this page</h2>} />

        {/* Fallback for non-existent routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

const WrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;
