import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { TanquesPage } from './pages/TanquesPage';
import { BombasPage } from './pages/BombasPage';
import { VentasPage } from './pages/VentasPage';
import { ReportesPage } from './pages/ReportesPage';
import { MainLayout } from './components/MainLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/usuarios" element={<UsersPage />} />
          <Route path="/tanques" element={<TanquesPage />} />
          <Route path="/bombas" element={<BombasPage />} />
          <Route path="/ventas" element={<VentasPage />} />
          <Route path="/reportes" element={<ReportesPage />} />
          {/* Add other protected routes here */}
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}
