import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppNavbar from "./components/AppNavbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Doctors from "./pages/Doctors.jsx";
import Book from "./pages/Book.jsx";
import ParentDashboard from "./pages/ParentDashboard.jsx";
import ServicePage from "./pages/ServicePage.jsx";
import PerfectAuthPage from "./components/PerfectAuthPage.jsx";
import { useAuth } from "./context/AuthContext.jsx";

// Protected Route Wrapper
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
}

export default function App() {
  return (
    <>
      <AppNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/auth" element={<PerfectAuthPage />} />

        <Route 
          path="/dashboard" 
          element={<PrivateRoute><ParentDashboard /></PrivateRoute>} 
        />
        <Route 
          path="/book" 
          element={<PrivateRoute><Book /></PrivateRoute>} 
        />
      </Routes>

      <Footer />
    </>
  );
}
