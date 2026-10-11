import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../api/AuthContext';

export default function InternshipDetail() {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/internships/${id}`)
      .then(r => setInternship(r.data))
      .catch(() => navigate('/internships'));
  }, [id, navigate]);

  const getSafeUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://') 
      ? url 
      : `https://${url}`;
  };

  const handleApply = async () => {
    const targetUrl = getSafeUrl(internship.applyUrl);
    let externalTab = null;
    if (targetUrl) {
      externalTab = window.open('', '_blank');
    }

    setIsSubmitting(true);
    try {
      await api.post(`/applications/apply/${id}`);
      setInternship(prev => ({ 
        ...prev, 
        applied: true, 
        applicantCount: (prev.applicantCount || 0) + 1 
      }));
      setMsg({ text: 'Application recorded successfully! Best of luck.', type: 'success' });

      if (externalTab && targetUrl) {
        externalTab.location.href = targetUrl;
      }
    } catch (err) {
      if (externalTab) externalTab.close();
      setMsg({ 
        text: err.response?.data?.message || 'Failed to submit application or already applied.', 
        type: 'danger' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!internship) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#64748b' }}>
        <div style={{ fontSize: '18px', fontWeight: '600' }}>Loading opportunity details...</div>
      </div>
    );
  }

  const validApplyUrl = getSafeUrl(internship.applyUrl);

  return (
    <div style={{
      maxWidth: '960px',
      margin: '40px auto',
      padding: '0 20px',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      
      {/* Top Navigation Bar */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#2563eb',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            padding: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          ← Back to Internships
        </button>
      </div>

      {/* Main Container Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.05)',
        overflow: 'hidden'
      }}>

        {/* Top Header Banner */}
        <div style={{
          padding: '32px 36px',
          borderBottom: '1px solid #f1f5f9',
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{
                background: '#eff6ff',
                color: '#1d4ed8',
                border: '1px solid #dbeafe',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '700'
              }}>
                🏢 {internship.company}
              </span>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#0f172a',
                margin: '12px 0 0 0',
                lineHeight: '1.25'
              }}>
                {internship.title}
              </h1>
            </div>

            {/* Status Indicator */}
            {user?.role === 'STUDENT' && (
              <div>
                {internship.applied ? (
                  <span style={{
                    background: '#f0fdf4',
                    color: '#166534',
                    border: '1px solid #bbf7d0',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '700'
                  }}>
                    ✓ Already Applied
                  </span>
                ) : internship.eligible ? (
                  <span style={{
                    background: '#eff6ff',
                    color: '#1d4ed8',
                    border: '1px solid #bfdbfe',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '700'
                  }}>
                    Eligible Candidate
                  </span>
                ) : (
                  <span style={{
                    background: '#fef2f2',
                    color: '#991b1b',
                    border: '1px solid #fecaca',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '700'
                  }}>
                    Not Eligible
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Feedback Alert Messages */}
        {msg.text && (
          <div style={{
            margin: '24px 36px 0',
            padding: '12px 18px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            background: msg.type === 'success' ? '#f0fdf4' : '#fef2f2',
            color: msg.type === 'success' ? '#166534' : '#991b1b',
            border: `1px solid ${msg.type === 'success' ? '#bbf7d0' : '#fecaca'}`
          }}>
            {msg.text}
          </div>
        )}

        {/* Key Metrics Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: '#f1f5f9',
          margin: '28px 36px',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ background: '#ffffff', padding: '18px 20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
              💰 Stipend
            </div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#166534', marginTop: '6px' }}>
              {internship.stipend ? `₹${internship.stipend}` : 'Unpaid / N/A'}
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '18px 20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
              📅 Last Date to Apply
            </div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginTop: '6px' }}>
              {internship.deadline || 'Closing Soon'}
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '18px 20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
              👥 Total Applicants
            </div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#2563eb', marginTop: '6px' }}>
              {internship.applicantCount ?? 0} Students
            </div>
          </div>
        </div>

        {/* Detailed Info Sections */}
        <div style={{ padding: '0 36px 36px' }}>
          
          {/* Eligibility Requirements */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '22px',
            marginBottom: '30px'
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: '0 0 16px', textTransform: 'uppercase' }}>
              Eligibility Criteria
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '8px' }}>
                  ELIGIBLE DEPARTMENTS:
                </span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {internship.eligibleDepartments && internship.eligibleDepartments.length > 0 ? (
                    internship.eligibleDepartments.map(d => (
                      <span key={d} style={{
                        background: '#ffffff',
                        color: '#1e40af',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>
                        {d}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '13px', color: '#64748b' }}>Open to All Departments</span>
                  )}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '8px' }}>
                  ELIGIBLE BATCHES:
                </span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {internship.eligibleBatches && internship.eligibleBatches.length > 0 ? (
                    internship.eligibleBatches.map(b => (
                      <span key={b} style={{
                        background: '#fef3c7',
                        color: '#92400e',
                        border: '1px solid #fde68a',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>
                        Class of {b}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '13px', color: '#64748b' }}>Open to All Batches</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Role Description */}
          <div style={{ marginBottom: '36px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
              Job Description & Responsibilities
            </h3>
            <div style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#334155',
              whiteSpace: 'pre-line',
              background: '#ffffff',
              padding: '4px 0'
            }}>
              {internship.description || 'No detailed job description was provided for this listing.'}
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '14px',
            paddingTop: '24px',
            borderTop: '1px solid #e2e8f0',
            flexWrap: 'wrap'
          }}>
            {/* Student Actions */}
            {user?.role === 'STUDENT' && (
              internship.applied ? (
                <>
                  <button
                    disabled
                    style={{
                      background: '#f1f5f9',
                      color: '#64748b',
                      border: '1px solid #cbd5e1',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      cursor: 'not-allowed'
                    }}
                  >
                    ✓ Applied
                  </button>
                  {validApplyUrl && (
                    <a
                      href={validApplyUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: '#2563eb',
                        color: '#ffffff',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        boxShadow: '0 2px 6px rgba(37, 99, 235, 0.2)'
                      }}
                    >
                      Visit Company Portal ↗
                    </a>
                  )}
                </>
              ) : internship.eligible ? (
                <button
                  onClick={handleApply}
                  disabled={isSubmitting}
                  style={{
                    background: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '15px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 2px 6px rgba(22, 163, 74, 0.25)'
                  }}
                >
                  {isSubmitting ? 'Submitting Application...' : 'Apply Now →'}
                </button>
              ) : (
                <button
                  disabled
                  style={{
                    background: '#fee2e2',
                    color: '#991b1b',
                    border: '1px solid #fecaca',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    cursor: 'not-allowed'
                  }}
                >
                  Not Eligible for your Branch/Batch
                </button>
              )
            )}

            {/* Admin Actions */}
            {user?.role === 'ADMIN' && validApplyUrl && (
              <a
                href={validApplyUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#2563eb',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  textDecoration: 'none'
                }}
              >
                External Application Link ↗
              </a>
            )}

            <button
              onClick={() => navigate(-1)}
              style={{
                background: '#f8fafc',
                color: '#475569',
                border: '1px solid #cbd5e1',
                padding: '12px 22px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Back
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}