import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './api/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import InternshipList from './pages/InternshipList';
import InternshipDetail from './pages/InternshipDetail';
import MyApplications from './pages/MyApplications';
import AdminDashboard from './pages/AdminDashboard';
import AdminInternships from './pages/AdminInternships';
import AdminStudents from './pages/AdminStudents';
import AdminApplications from './pages/AdminApplications';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/internships" element={<InternshipList />} />
          <Route path="/internships/:id" element={<InternshipDetail />} />
          <Route path="/my-applications" element={
            <ProtectedRoute role="STUDENT"><MyApplications /></ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/admin/internships" element={
            <ProtectedRoute role="ADMIN"><AdminInternships /></ProtectedRoute>
          } />
          <Route path="/admin/students" element={
            <ProtectedRoute role="ADMIN"><AdminStudents /></ProtectedRoute>
          } />
          <Route path="/admin/applications" element={
            <ProtectedRoute role="ADMIN"><AdminApplications /></ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
