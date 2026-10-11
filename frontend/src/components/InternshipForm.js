import React, { useState } from 'react';
import api from '../api/axios';

const DEPARTMENTS = ['IT', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'EEE', 'AIDS'];
const BATCHES = [2025, 2026, 2027, 2028, 2029];

export default function InternshipForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    company: initial?.company || '',
    description: initial?.description || '',
    stipend: initial?.stipend || '',
    deadline: initial?.deadline || '',
    applyUrl: initial?.applyUrl || '',
    eligibleDepartments: initial?.eligibleDepartments || [],
    eligibleBatches: initial?.eligibleBatches || [],
  });
  const [error, setError] = useState('');

  const toggleDept = (d) => setForm(f => ({
    ...f,
    eligibleDepartments: f.eligibleDepartments.includes(d)
      ? f.eligibleDepartments.filter(x => x !== d)
      : [...f.eligibleDepartments, d]
  }));

  const toggleBatch = (b) => setForm(f => ({
    ...f,
    eligibleBatches: f.eligibleBatches.includes(b)
      ? f.eligibleBatches.filter(x => x !== b)
      : [...f.eligibleBatches, b]
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (initial?.id) {
        await api.put(`/internships/${initial.id}`, form);
      } else {
        await api.post('/internships', form);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-msg">{error}</div>}
      <div className="form-group">
        <label>Title</label>
        <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Company</label>
        <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Stipend</label>
        <input value={form.stipend} onChange={e => setForm({...form, stipend: e.target.value})} placeholder="e.g. ₹10,000/month" />
      </div>
      <div className="form-group">
        <label>Last Date to Apply</label>
        <input type="date" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Application URL</label>
        <input type="url" value={form.applyUrl} onChange={e => setForm({...form, applyUrl: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Eligible Departments</label>
        <div className="checkbox-group">
          {DEPARTMENTS.map(d => (
            <label key={d} className="checkbox-item">
              <input type="checkbox" checked={form.eligibleDepartments.includes(d)} onChange={() => toggleDept(d)} />
              {d}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Eligible Batches</label>
        <div className="checkbox-group">
          {BATCHES.map(b => (
            <label key={b} className="checkbox-item">
              <input type="checkbox" checked={form.eligibleBatches.includes(b)} onChange={() => toggleBatch(b)} />
              {b}
            </label>
          ))}
        </div>
      </div>
      <div className="modal-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{initial ? 'Update' : 'Create'}</button>
      </div>
    </form>
  );
}
