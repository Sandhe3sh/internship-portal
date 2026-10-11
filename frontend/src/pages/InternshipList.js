import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../api/AuthContext';

const DEPARTMENTS = ['IT', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'EEE', 'AIDS'];
const BATCHES = [2025, 2026, 2027, 2028, 2029];

export default function InternshipList() {
  const [internships, setInternships] = useState([]);
  const [filters, setFilters] = useState({ company: '', department: '', batch: '' });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchInternships = async () => {
    setLoading(true);
    const params = {};
    if (filters.company) params.company = filters.company;
    if (filters.department) params.department = filters.department;
    if (filters.batch) params.batch = filters.batch;
    const { data } = await api.get('/internships', { params });
    setInternships(data);
    setLoading(false);
  };

  useEffect(() => { fetchInternships(); }, [filters]);

  return (
    <div className="container">
      <div className="page-header">
        <h1>Browse Internships</h1>
        {user && <span>Welcome, {user.name} ({user.department} - {user.batch})</span>}
      </div>
      <div className="filters">
        <input placeholder="Search by company..." value={filters.company}
          onChange={e => setFilters({...filters, company: e.target.value})} />
        <select value={filters.department} onChange={e => setFilters({...filters, department: e.target.value})}>
          <option value="">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filters.batch} onChange={e => setFilters({...filters, batch: e.target.value})}>
          <option value="">All Batches</option>
          {BATCHES.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      {loading ? <div className="loading">Loading...</div> : internships.length === 0 ? (
        <div className="empty-state"><p>No internships found.</p></div>
      ) : (
        <div className="grid">
          {internships.map(i => (
            <div key={i.id} className="internship-card">
              <h3>{i.title}</h3>
              <div className="company">{i.company}</div>
              <div className="meta">💰 {i.stipend || 'N/A'} &nbsp;|&nbsp; 📅 Deadline: {i.deadline}</div>
              <div className="meta">👥 {i.applicantCount} applicant(s)</div>
              <div className="tags">
                {i.eligibleDepartments?.map(d => <span key={d} className="tag">{d}</span>)}
                {i.eligibleBatches?.map(b => <span key={b} className="tag tag-batch">{b}</span>)}
              </div>
              <div style={{display:'flex', gap:'0.5rem', alignItems:'center', marginTop:'0.5rem'}}>
                {user?.role === 'STUDENT' && (
                  i.applied ? <span className="badge-applied">Applied</span>
                  : i.eligible ? <span className="badge-eligible">Eligible</span>
                  : <span className="badge-ineligible">Not Eligible</span>
                )}
                <Link to={`/internships/${i.id}`} className="btn btn-outline btn-sm">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
