import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import InternshipForm from '../components/InternshipForm';

export default function AdminInternships() {
  const [internships, setInternships] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => api.get('/internships').then(r => setInternships(r.data));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this internship?')) return;
    await api.delete(`/internships/${id}`);
    load();
  };

  const handleSave = () => { setShowForm(false); setEditing(null); load(); };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Manage Internships</h1>
        <button className="btn btn-primary" onClick={() => { setEditing(null); setShowForm(true); }}>+ Add Internship</button>
      </div>
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{editing ? 'Edit Internship' : 'Add Internship'}</h2>
            <InternshipForm initial={editing} onSave={handleSave} onCancel={() => { setShowForm(false); setEditing(null); }} />
          </div>
        </div>
      )}
      <div className="card">
        <table>
          <thead>
            <tr><th>Title</th><th>Company</th><th>Deadline</th><th>Applicants</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {internships.map(i => (
              <tr key={i.id}>
                <td><Link to={`/internships/${i.id}`}>{i.title}</Link></td>
                <td>{i.company}</td>
                <td>{i.deadline}</td>
                <td>{i.applicantCount}</td>
                <td style={{display:'flex', gap:'0.5rem'}}>
                  <button className="btn btn-outline btn-sm" onClick={() => { setEditing(i); setShowForm(true); }}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(i.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
