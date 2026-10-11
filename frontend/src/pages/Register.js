
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../api/AuthContext';

const DEPARTMENTS = [
  'IT', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'AIDS'
];

const BATCHES = [2025, 2026, 2027, 2028, 2029];

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    batch: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.department ||
      !form.batch
    ) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        department: form.department,
        batch: Number(form.batch)
      };

      const { data } = await api.post('/auth/register', payload);

      if (!data?.token) {
        setError('Registration response did not contain a token.');
        return;
      }

      login(data);
      navigate('/internships');

    } catch (err) {
      console.error('Registration error:', err);

      if (err.response) {
        const status = err.response.status;
        const message =
          err.response.data?.message ||
          err.response.data?.error;

        setError(
          message || `Registration failed. HTTP status: ${status}`
        );
      } else if (err.request) {
        setError(
          'Cannot connect to the backend. Check the API URL and CORS settings.'
        );
      } else {
        setError(err.message || 'Unexpected registration error.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      {error && (
        <div className="error-msg" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="batch">Batch Year</label>
          <select
            id="batch"
            name="batch"
            value={form.batch}
            onChange={handleChange}
            required
          >
            <option value="">Select Batch</option>
            {BATCHES.map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%' }}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
