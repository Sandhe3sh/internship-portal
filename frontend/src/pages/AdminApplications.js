import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => api.get('/applications/all').then(r => { setApplications(r.data); setLoading(false); });
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/applications/${id}/status`, null, { params: { status } });
    load();
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <div className="page-header"><h1>All Applications</h1></div>
      <div className="card">
        <table>
          <thead>
            <tr><th>Student</th><th>Department</th><th>Batch</th><th>Internship</th><th>Company</th><th>Applied On</th><th>Status</th></tr>
          </thead>
          <tbody>
            {applications.map(a => (
              <tr key={a.id}>
                <td>{a.studentName}<br/><small style={{color:'#999'}}>{a.studentEmail}</small></td>
                <td>{a.studentDepartment}</td>
                <td>{a.studentBatch}</td>
                <td>{a.internshipTitle}</td>
                <td>{a.company}</td>
                <td>{new Date(a.appliedAt).toLocaleDateString()}</td>
                <td>
                  <select value={a.status} onChange={e => updateStatus(a.id, e.target.value)}
                    className={`status-${a.status}`} style={{border:'none', background:'transparent', cursor:'pointer', fontWeight:600}}>
                    <option value="APPLIED">APPLIED</option>
                    <option value="SHORTLISTED">SHORTLISTED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
