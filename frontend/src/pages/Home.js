import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Home() {
  const [internships, setInternships] = useState([]);
  const [activeCount, setActiveCount] = useState(0);

  // Department streams supported by the portal
  const departments = [
    'CSE',
    'IT',
    'ECE',
    'AI&DS',
    'EEE',
    'MECH',
    'MECHATRONICS',
    'CIVIL'
  ];

  useEffect(() => {
    // Fetch live internships from MySQL via Spring Boot
    api.get('/internships')
      .then(r => {
        let list = [];
        if (Array.isArray(r.data)) {
          list = r.data;
        } else if (Array.isArray(r.data?.content)) {
          list = r.data.content;
        } else if (Array.isArray(r.data?.data)) {
          list = r.data.data;
        }

        setInternships(list.slice(0, 6)); // Display latest 6 cards
        setActiveCount(list.length);      // Exact real-time database count
      })
      .catch(err => {
        console.error('Error loading internships:', err.response?.status, err.message);
        setInternships([]);
        setActiveCount(0);
      });
  }, []);

  return (
    <>
      {/* 1. HERO BANNER */}
      <div className="home-hero">
        <span
          className="hero-pill"
          style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.18)',
            color: '#ffffff',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '16px',
            letterSpacing: '0.5px'
          }}
        >
          Internship Portal
        </span>
        <h1>Find Your Perfect Internship</h1>
        <p>Discover opportunities tailored to your department and batch</p>
        <div className="hero-actions">
          <Link to="/register" className="btn btn-white">Get Started</Link>
          <Link to="/login" className="btn btn-white-outline">Login</Link>
        </div>
      </div>

      <div className="container">

        {/* 2. REAL-TIME STATS BAR */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginTop: '-40px',
            marginBottom: '40px',
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            position: 'relative',
            zIndex: 2,
            textAlign: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#2563eb' }}>
              {activeCount}
            </div>
            <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginTop: '4px' }}>
              Active Opportunities
            </div>
          </div>

          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#059669' }}>
              {departments.length}
            </div>
            <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginTop: '4px' }}>
              Eligible Departments
            </div>
          </div>

          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#7c3aed' }}>
              100%
            </div>
            <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginTop: '4px' }}>
              Verified Opportunities
            </div>
          </div>
        </div>

        {/* 3. SUPPORTED DEPARTMENTS STRIP */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '40px'
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '12px' }}>
            🎓 Eligible Departments Supported by Portal:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {departments.map(dept => (
              <span
                key={dept}
                style={{
                  background: '#ffffff',
                  color: '#1e40af',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '0.5px'
                }}
              >
                {dept}
              </span>
            ))}
          </div>
        </div>

        {/* 4. LATEST INTERNSHIPS GRID */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div className="section-title" style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>
            Latest Internships
          </div>
          {internships.length > 0 && (
            <Link to="/internships" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none', fontSize: '14px' }}>
              Browse All ({activeCount}) →
            </Link>
          )}
        </div>

        {internships.length === 0 ? (
          <div
            className="empty-state"
            style={{
              background: '#f8fafc',
              border: '2px dashed #cbd5e1',
              borderRadius: '12px',
              padding: '50px 20px',
              textAlign: 'center',
              marginBottom: '60px'
            }}
          >
            <p style={{ margin: 0, color: '#64748b', fontSize: '15px' }}>
              No internships posted yet. New listings will appear here soon.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '60px'
            }}
          >
            {internships.map(i => (
              <div
                key={i.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {/* Top decorative primary stripe */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #2563eb, #38bdf8)'
                  }}
                />

                {/* Card Title & Company */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span
                      style={{
                        background: '#eff6ff',
                        color: '#1d4ed8',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '700',
                        textTransform: 'capitalize'
                      }}
                    >
                      🏢 {i.company}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#0f172a',
                      margin: '6px 0 14px',
                      lineHeight: '1.4'
                    }}
                  >
                    {i.title}
                  </h3>

                  {/* Stipend & Deadline metadata */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#f0fdf4',
                        color: '#15803d',
                        border: '1px solid #dcfce7',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      💰 {i.stipend ? `₹${i.stipend}` : 'Unpaid / N/A'}
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#fef2f2',
                        color: '#b91c1c',
                        border: '1px solid #fee2e2',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      📅 {i.deadline || 'Closing Soon'}
                    </span>
                  </div>

                  {/* Tags for Departments & Batches */}
                  <div
                    style={{
                      borderTop: '1px dashed #e2e8f0',
                      paddingTop: '12px',
                      marginBottom: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', minWidth: '45px' }}>
                        BRANCH:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {i.eligibleDepartments && i.eligibleDepartments.length > 0 ? (
                          i.eligibleDepartments.map(d => (
                            <span
                              key={d}
                              style={{
                                background: '#f8fafc',
                                color: '#334155',
                                border: '1px solid #cbd5e1',
                                borderRadius: '4px',
                                padding: '2px 8px',
                                fontSize: '11px',
                                fontWeight: '700'
                              }}
                            >
                              {d}
                            </span>
                          ))
                        ) : (
                          <span style={{ fontSize: '11px', color: '#64748b' }}>All Branches</span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', minWidth: '45px' }}>
                        BATCH:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {i.eligibleBatches && i.eligibleBatches.length > 0 ? (
                          i.eligibleBatches.map(b => (
                            <span
                              key={b}
                              style={{
                                background: '#fef3c7',
                                color: '#92400e',
                                border: '1px solid #fde68a',
                                borderRadius: '4px',
                                padding: '2px 8px',
                                fontSize: '11px',
                                fontWeight: '700'
                              }}
                            >
                              {b}
                            </span>
                          ))
                        ) : (
                          <span style={{ fontSize: '11px', color: '#64748b' }}>All Batches</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <Link
                  to={`/internships/${i.id}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    background: '#2563eb',
                    color: '#ffffff',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.15)',
                    boxSizing: 'border-box'
                  }}
                >
                  View Details & Apply →
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* 5. ABOUT THE INTERNSHIP PORTAL */}
        <div style={{ marginBottom: '60px' }}>
          <div className="section-title" style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>
            About the Internship Portal
          </div>
          <p style={{ color: '#64748b', marginTop: '6px', marginBottom: '28px', fontSize: '14px' }}>
            A centralized system for verifying, listing, and tracking engineering internships across eligible branches.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '24px'
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>🎯</div>
              <h4 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700' }}>
                Department-Specific Eligibility
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
                Filter listings by your branch (CSE, IT, ECE, AI&DS, EEE, MECH, Mechatronics, Civil) and passing batch year.
              </p>
            </div>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '24px'
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>⚡</div>
              <h4 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700' }}>
                Direct Application Links
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
                Submit internal applications to show candidate interest, then seamlessly navigate to official application URLs.
              </p>
            </div>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '24px'
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>📊</div>
              <h4 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700' }}>
                Application Tracking
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
                Track live applicant counts and check whether you have already submitted your profile for a given role.
              </p>
            </div>
          </div>
        </div>

        {/* 6. MANAGED BY SANDHEESH S */}
        <div
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '36px',
            marginBottom: '60px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '28px',
            flexWrap: 'wrap'
          }}
        >
          <div
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: '800',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)'
            }}
          >
            SS
          </div>

          <div style={{ flex: '1', minWidth: '260px' }}>
            <span
              style={{
                display: 'inline-block',
                background: '#dbeafe',
                color: '#1d4ed8',
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                marginBottom: '8px'
              }}
            >
              Internship Portal Management
            </span>
            <h3 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>
              Managed by SANDHEESH S
            </h3>
            <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
              Overseeing role postings, department-level verification, and candidate applications to provide a reliable, centralized internship portal experience.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '12px', color: '#2563eb', fontWeight: '600' }}>
              <span>✓ Verified Department Roles</span>
              <span>•</span>
              <span>✓ Batch-Specific Filtering</span>
              <span>•</span>
              <span>✓ Streamlined Applications</span>
            </div>
          </div>
        </div>

      </div>

      {/* 7. FOOTER */}
      <footer
        style={{
          background: '#0f172a',
          color: '#94a3b8',
          padding: '24px 20px',
          textAlign: 'center',
          fontSize: '13px'
        }}
      >
        <p style={{ margin: '0 0 6px' }}>
          © 2026 <strong>InternPortal</strong> — Internship Portal
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
          Managed by <strong>SANDHEESH S</strong>. All rights reserved.
        </p>
      </footer>
    </>
  );
}