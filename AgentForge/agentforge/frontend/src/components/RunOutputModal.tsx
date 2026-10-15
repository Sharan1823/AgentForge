import React, { useState, useEffect } from 'react';
import { X, Download, CheckCircle, Clock, AlertCircle, Mail, FileText, Calendar, Image, TrendingUp, Copy } from 'lucide-react';
import { api } from '../lib/api';

interface RunOutputModalProps {
  runId: string;
  agentName: string;
  department: string;
  onClose: () => void;
}

export default function RunOutputModal({ runId, agentName, department, onClose }: RunOutputModalProps) {
  const [logs, setLogs] = useState<any[]>([]);
  const [status, setStatus] = useState<string>('RUNNING');
  const [loading, setLoading] = useState(true);
  const [outputType, setOutputType] = useState<string>('GENERAL');
  const [outputData, setOutputData] = useState<any>(null);

  useEffect(() => {
    const poll = setInterval(async () => {
      try {
        const { data } = await api.get(`/api/execute/${runId}/runs`);
        const runs = data.runs || [];
        const currentRun = runs[0];
        if (!currentRun) return;

        setStatus(currentRun.status);
        const runLogs = Array.isArray(currentRun.logs) ? currentRun.logs : [];
        setLogs(runLogs);

        // Detect output type from logs
        for (const log of runLogs) {
          if (log.data?.type === 'PDF_REPORT') {
            setOutputType('PDF_REPORT');
            setOutputData(log.data);
          } else if (log.data?.type === 'SCHEDULED_POSTS') {
            setOutputType('SCHEDULED_POSTS');
            setOutputData(log.data);
          } else if (log.data?.type === 'IMAGE_CAPTIONS') {
            setOutputType('IMAGE_CAPTIONS');
            setOutputData(log.data);
          } else if (log.data?.type === 'LLM_OUTPUT') {
            setOutputType('LLM_OUTPUT');
            setOutputData(log.data);
          } else if (log.data?.mode === 'ai_reply' || log.data?.mode === 'ai_compose') {
            setOutputType('EMAIL');
            setOutputData(log.data);
          } else if (log.data?.overduePayments || log.data?.pendingPayments) {
            setOutputType('PAYMENT_REPORT');
            setOutputData(log.data);
          }
        }

        if (currentRun.status !== 'RUNNING' && currentRun.status !== 'WAITING_APPROVAL') {
          clearInterval(poll);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    }, 2000);

    return () => clearInterval(poll);
  }, [runId]);

  const getDeptColor = () => {
    const colors: Record<string, string> = {
      SALES: '#f59e0b', HR: '#10b981', MARKETING: '#8b5cf6',
      FINANCE: '#3b82f6', SUPPORT: '#ef4444',
    };
    return colors[department] || '#6c63ff';
  };

  const renderOutput = () => {
    if (status === 'RUNNING') {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid rgba(108,99,255,0.2)', borderTop: '4px solid #6c63ff', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#7a7a9a', fontSize: '14px' }}>Agent is running... This may take a moment.</p>
          <div style={{ marginTop: '20px', textAlign: 'left' }}>
            {logs.slice(-3).map((log, i) => (
              <div key={i} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', marginBottom: '6px', fontSize: '12px', color: '#7a7a9a', borderLeft: '2px solid #6c63ff' }}>
                {log.message}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (outputType === 'SCHEDULED_POSTS' && outputData) {
      return (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Calendar size={20} color="#8b5cf6" />
            <h3 style={{ color: '#f0f0f8', fontFamily: "'Syne', sans-serif", margin: 0 }}>
              {outputData.totalScheduled} Posts Scheduled
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(outputData.posts || []).map((post: any, i: number) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
                    {post.platform}
                  </span>
                  <span style={{ color: '#43e8b0', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    {post.humanReadableTime}
                  </span>
                </div>
                <p style={{ color: '#d0d0e8', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                  {post.optimizedCaption}
                </p>
              </div>
            ))}
          </div>
          {outputData.reportUrl && (
            <a href={outputData.reportUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', background: '#6c63ff', color: 'white', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px' }}>
              <Download size={14} /> Download Full Schedule
            </a>
          )}
        </div>
      );
    }

    if (outputType === 'IMAGE_CAPTIONS' && outputData) {
      const captionText = outputData.captions || '';
      const sections = ['INSTAGRAM', 'LINKEDIN', 'TWITTER', 'FACEBOOK', 'ADVERTISEMENT'];
      const parsed: Record<string, string> = {};
      sections.forEach((s, i) => {
        const start = captionText.indexOf(s + ':');
        const end = i < sections.length - 1 ? captionText.indexOf(sections[i + 1] + ':') : captionText.length;
        if (start !== -1) parsed[s] = captionText.substring(start + s.length + 1, end).trim();
      });

      const platformColors: Record<string, string> = {
        INSTAGRAM: '#e1306c', LINKEDIN: '#0077b5', TWITTER: '#1da1f2',
        FACEBOOK: '#1877f2', ADVERTISEMENT: '#f59e0b',
      };

      return (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Image size={20} color="#8b5cf6" />
            <h3 style={{ color: '#f0f0f8', fontFamily: "'Syne', sans-serif", margin: 0 }}>Social Media Captions</h3>
          </div>
          {Object.entries(parsed).map(([platform, caption]) => (
            <div key={platform} style={{ marginBottom: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ background: platformColors[platform] || '#6c63ff', padding: '6px 14px' }}>
                <span style={{ color: 'white', fontSize: '11px', fontWeight: 700 }}>{platform}</span>
              </div>
              <div style={{ padding: '12px 14px' }}>
                <p style={{ color: '#d0d0e8', fontSize: '13px', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>{caption}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(caption)}
                  style={{ marginTop: '8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#7a7a9a', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (outputType === 'EMAIL' && outputData) {
      const results = outputData.results || [];
      return (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Mail size={20} color="#43e8b0" />
            <h3 style={{ color: '#f0f0f8', fontFamily: "'Syne', sans-serif", margin: 0 }}>
              {results.filter((r: any) => r.success).length} Emails Sent
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {results.map((r: any, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                {r.success
                  ? <CheckCircle size={16} color="#43e8b0" />
                  : <AlertCircle size={16} color="#ef4444" />
                }
                <span style={{ color: '#d0d0e8', fontSize: '13px', flex: 1 }}>{r.to}</span>
                <span style={{ fontSize: '11px', color: r.success ? '#43e8b0' : '#ef4444' }}>
                  {r.success ? 'Sent' : 'Failed'}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (outputType === 'PDF_REPORT' && outputData) {
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <FileText size={48} color="#6c63ff" style={{ margin: '0 auto 16px', display: 'block' }} />
          <h3 style={{ color: '#f0f0f8', fontFamily: "'Syne', sans-serif", marginBottom: '8px' }}>Report Generated</h3>
          <p style={{ color: '#7a7a9a', fontSize: '13px', marginBottom: '20px' }}>{outputData.filename}</p>
          <a
            href={outputData.downloadUrl}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#6c63ff', color: 'white', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}
          >
            <Download size={16} /> Download PDF Report
          </a>
        </div>
      );
    }

    if (outputType === 'PAYMENT_REPORT' && outputData) {
      const overdue = outputData.overduePayments || [];
      const pending = outputData.pendingPayments || [];
      const totalOverdue = overdue.reduce((s: number, p: any) => s + (p.amount || 0), 0);
      const totalPending = pending.reduce((s: number, p: any) => s + (p.amount || 0), 0);

      return (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <TrendingUp size={20} color="#3b82f6" />
            <h3 style={{ color: '#f0f0f8', fontFamily: "'Syne', sans-serif", margin: 0 }}>Payment Report</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            {[
              { label: 'Overdue Count', value: overdue.length, color: '#ef4444' },
              { label: 'Total Overdue', value: `Rs.${totalOverdue.toLocaleString('en-IN')}`, color: '#ef4444' },
              { label: 'Pending Count', value: pending.length, color: '#3b82f6' },
              { label: 'Total Pending', value: `Rs.${totalPending.toLocaleString('en-IN')}`, color: '#3b82f6' },
            ].map((card, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '14px' }}>
                <div style={{ fontSize: '11px', color: '#7a7a9a', marginBottom: '4px' }}>{card.label}</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: card.color }}>{card.value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(26,26,46,0.8)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
            <span style={{ color: '#f0f0f8', fontSize: '14px', fontWeight: 700 }}>
              Grand Total: Rs.{(totalOverdue + totalPending).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      );
    }

    // LLM Output — show content + download button
    if (outputType === 'LLM_OUTPUT' && outputData) {
      return (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <FileText size={18} color="#43e8b0" />
            <h3 style={{ color: '#f0f0f8', fontWeight: 700, fontSize: '15px', margin: 0 }}>
              Output Generated 
            </h3>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '16px',
            maxHeight: '280px',
            overflowY: 'auto',
            marginBottom: '14px',
          }}>
            <p style={{
              color: '#d0d0e8',
              fontSize: '13px',
              lineHeight: 1.7,
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}>
              {outputData.content}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => navigator.clipboard.writeText(outputData.content)}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#d0d0e8',
                padding: '10px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Copy size={14} /> Copy Text
            </button>
            {outputData.downloadUrl && (
              <a
                href={outputData.downloadUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  background: '#6c63ff',
                  color: 'white',
                  padding: '10px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <Download size={14} /> Download PDF
              </a>
            )}
          </div>
        </div>
      );
    }

    // General output — show logs
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <CheckCircle size={20} color="#43e8b0" />
          <h3 style={{ color: '#f0f0f8', fontFamily: "'Syne', sans-serif", margin: 0 }}>Run Completed</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '300px', overflowY: 'auto' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: '12px', color: log.message?.includes('✅') ? '#43e8b0' : log.message?.includes('❌') ? '#ef4444' : '#9090b0', borderLeft: `2px solid ${log.message?.includes('✅') ? '#43e8b0' : log.message?.includes('❌') ? '#ef4444' : '#6c63ff'}` }}>
              <span style={{ color: '#4a4a6a', marginRight: '8px' }}>{new Date(log.timestamp).toLocaleTimeString()}</span>
              {log.message}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', width: '100%', maxWidth: '560px', maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>

        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '16px', color: '#f0f0f8' }}>{agentName}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span style={{ background: `${getDeptColor()}20`, color: getDeptColor(), padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600 }}>{department}</span>
              <span style={{ fontSize: '12px', color: status === 'SUCCESS' ? '#43e8b0' : status === 'FAILED' ? '#ef4444' : status === 'RUNNING' ? '#6c63ff' : '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {status === 'RUNNING' && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6c63ff', animation: 'pulse 1s infinite' }} />}
                {status === 'SUCCESS' && <CheckCircle size={12} />}
                {status === 'FAILED' && <AlertCircle size={12} />}
                {status}
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#7a7a9a', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {renderOutput()}
        </div>

      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}