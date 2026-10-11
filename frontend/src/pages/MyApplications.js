import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/applications/my').then(r => { setApplications(r.data); setLoading(false); });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <div className="page-header"><h1>My Applications</h1></div>
      {applications.length === 0 ? (
        <div className="empty-state"><p>You haven't applied to any internships yet.</p></div>
      ) : (
        <div className="card">
          <table>
            <thead>
              <tr><th>Internship</th><th>Company</th><th>Applied On</th><th>Status</th></tr>
            </thead>
            <tbody>
              {applications.map(a => (
                <tr key={a.id}>
                  <td>{a.internshipTitle}</td>
                  <td>{a.company}</td>
                  <td>{new Date(a.appliedAt).toLocaleDateString()}</td>
                  <td><span className={`status-${a.status}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
