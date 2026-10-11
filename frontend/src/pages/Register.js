import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../api/AuthContext';

const DEPARTMENTS = ['IT', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'EEE', 'AIDS'];
const BATCHES = [2025, 2026, 2027, 2028, 2029];

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '', batch: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/register', { ...form, batch: parseInt(form.batch) });
      login(data);
      navigate('/internships');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Department</label>
          <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} required>
            <option value="">Select Department</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Batch Year</label>
          <select value={form.batch} onChange={e => setForm({...form, batch: e.target.value})} required>
            <option value="">Select Batch</option>
            {BATCHES.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Register</button>
      </form>
      <div className="auth-link">Already have an account? <Link to="/login">Login</Link></div>
    </div>
  );
}
