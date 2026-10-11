import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../api/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      login(data);
      navigate(data.role === 'ADMIN' ? '/admin' : '/internships');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        </div>
        <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Login</button>
      </form>
      <div className="auth-link">Don't have an account? <Link to="/register">Register</Link></div>
    </div>
  );
}
