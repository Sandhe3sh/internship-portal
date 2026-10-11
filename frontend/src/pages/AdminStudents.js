import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);

  const load = () => api.get('/users').then(r => setStudents(r.data));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this student?')) return;
    await api.delete(`/users/${id}`);
    load();
  };

  return (
    <div className="container">
      <div className="page-header"><h1>Registered Students</h1></div>
      <div className="card">
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Department</th><th>Batch</th><th>Action</th></tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.department}</td>
                <td>{s.batch}</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
