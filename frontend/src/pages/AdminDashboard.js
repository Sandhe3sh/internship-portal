import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ internships: 0, students: 0, applications: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/internships'),
      api.get('/users'),
      api.get('/applications/all')
    ]).then(([i, u, a]) => setStats({
      internships: i.data.length,
      students: u.data.length,
      applications: a.data.length
    })).catch(() => {});
  }, []);

  return (
    <div className="container">
      <div className="page-header"><h1>Admin Dashboard</h1></div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="number">{stats.internships}</div>
          <div className="label">Total Internships</div>
        </div>
        <div className="stat-card">
          <div className="number">{stats.students}</div>
          <div className="label">Registered Students</div>
        </div>
        <div className="stat-card">
          <div className="number">{stats.applications}</div>
          <div className="label">Total Applications</div>
        </div>
      </div>
      <div className="grid">
        <Link to="/admin/internships" className="card" style={{textAlign:'center', cursor:'pointer'}}>
          <h3>📋 Manage Internships</h3>
          <p style={{color:'#666', marginTop:'0.5rem'}}>Add, edit, delete internship posts</p>
        </Link>
        <Link to="/admin/students" className="card" style={{textAlign:'center', cursor:'pointer'}}>
          <h3>👥 Manage Students</h3>
          <p style={{color:'#666', marginTop:'0.5rem'}}>View registered students</p>
        </Link>
        <Link to="/admin/applications" className="card" style={{textAlign:'center', cursor:'pointer'}}>
          <h3>📝 View Applications</h3>
          <p style={{color:'#666', marginTop:'0.5rem'}}>Track and manage applications</p>
        </Link>
      </div>
    </div>
  );
}
