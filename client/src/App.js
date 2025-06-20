import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ReflectionPage from './pages/ReflectionPage';
import RewardsPage from './pages/RewardsPage';
import GrowthPage from './pages/GrowthPage';


function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reflect" element={<ReflectionPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/growth" element={<GrowthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
