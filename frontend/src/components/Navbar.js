import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../api/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🎓 InternPortal</Link>
      <div className="navbar-links">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : user.role === 'ADMIN' ? (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/internships">Internships</Link>
            <Link to="/admin/students">Students</Link>
            <Link to="/admin/applications">Applications</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/internships">Browse</Link>
            <Link to="/my-applications">My Applications</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
