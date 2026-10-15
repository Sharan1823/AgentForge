import React, { useState, useEffect } from 'react';
import {
  Bot, Trash2, Play, Clock, CheckCircle, XCircle, AlertCircle,
  MoreVertical, Download, Copy, Plus, Search, Filter,
  X, Mail, FileText, Calendar, TrendingUp, Image, Link,
} from 'lucide-react';
import { api, normalizeApiError } from '../lib/api';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Agent {
  id: string;
  name: string;
  description: string;
  department: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  trigger: string;
  tools: string[];
  lastRun?: { id: string; status: string; startedAt: string; endedAt?: string };
  runCount?: number;
}

// ─── Run Output Modal ─────────────────────────────────────────────────────────
function RunOutputModal({
  agentId,
  agentName,
  department,
  onClose,
}: {
  agentId: string;
  agentName: string;
  department: string;
  onClose: () => void;
}) {
  const [logs, setLogs] = useState<any[]>([]);
  const [status, setStatus] = useState<string>('RUNNING');
  const [outputType, setOutputType] = useState<string>('GENERAL');
  const [outputData, setOutputData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const deptColors: Record<string, string> = {
    SALES: '#f59e0b', HR: '#10b981', MARKETING: '#8b5cf6',
    FINANCE: '#3b82f6', SUPPORT: '#ef4444',
  };
  const deptColor = deptColors[department] || '#6c63ff';

  useEffect(() => {
    if (!agentId || agentId === 'undefined') {
      setError('Invalid agent ID');
      return;
    }

    const poll = setInterval(async () => {
      try {
        const { data } = await api.get(`/api/execute/${agentId}/runs`);
        const runs = data.runs || [];
        if (runs.length === 0) return;

        const run = runs[0];
        setStatus(run.status);
        const runLogs: any[] = Array.isArray(run.logs) ? run.logs : [];
        setLogs(runLogs);

        for (const log of runLogs) {
          if (log.data?.type === 'PDF_REPORT') {
            setOutputType('PDF_REPORT'); setOutputData(log.data);
          } else if (log.data?.type === 'SCHEDULED_POSTS') {
            setOutputType('SCHEDULED_POSTS'); setOutputData(log.data);
          } else if (log.data?.type === 'IMAGE_CAPTIONS') {
            setOutputType('IMAGE_CAPTIONS'); setOutputData(log.data);
          } else if (log.data?.type === 'LLM_OUTPUT') {
            setOutputType('LLM_OUTPUT'); setOutputData(log.data);
          } else if (log.data?.mode === 'ai_reply' || log.data?.mode === 'ai_compose') {
            setOutputType('EMAIL'); setOutputData(log.data);
          } else if (log.data?.overduePayments || log.data?.pendingPayments) {
            setOutputType('PAYMENT_REPORT'); setOutputData(log.data);
          }
        }

        if (run.status !== 'RUNNING' && run.status !== 'WAITING_APPROVAL') {
          clearInterval(poll);
        }
      } catch (err) {
        console.error('Poll error:', err);
      }
    }, 2000);

    api.get(`/api/execute/${agentId}/runs`).then(({ data }) => {
      const runs = data.runs || [];
      if (runs.length > 0) {
        setStatus(runs[0].status);
        setLogs(Array.isArray(runs[0].logs) ? runs[0].logs : []);
      }
    }).catch(() => {});

    return () => clearInterval(poll);
  }, [agentId]);

  const renderContent = () => {
    if (error) {
      return (
        <div style={{ textAlign: 'center', padding: '32px', color: '#ef4444' }}>
          <AlertCircle size={40} style={{ margin: '0 auto 12px', display: 'block' }} />
          <p>{error}</p>
        </div>
      );
    }

    if (status === 'RUNNING' || status === 'WAITING_APPROVAL') {
      return (
        <div style={{ textAlign: 'center', padding: '32px 16px' }}>
          <div style={{ width: '44px', height: '44px', border: '4px solid rgba(108,99,255,0.2)', borderTop: '4px solid #6c63ff', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#7a7a9a', fontSize: '13px', marginBottom: '20px' }}>
            {status === 'WAITING_APPROVAL' ? 'Waiting for approval...' : 'Agent is running... This may take a minute.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {logs.slice(-4).map((log, i) => (
              <div key={i} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: '12px', color: '#7a7a9a', borderLeft: '2px solid #6c63ff', textAlign: 'left' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Calendar size={18} color="#8b5cf6" />
            <h3 style={{ color: '#f0f0f8', fontWeight: 700, fontSize: '15px', margin: 0 }}>
              {outputData.totalScheduled} Posts Scheduled ✅
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(outputData.posts || []).map((post: any, i: number) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(139,92,246,0.1)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: 700 }}>{post.platform}</span>
                  <span style={{ color: '#43e8b0', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={11} /> {post.humanReadableTime}
                  </span>
                </div>
                <p style={{ color: '#c0c0d8', fontSize: '12px', lineHeight: 1.6, margin: 0, padding: '10px 12px', whiteSpace: 'pre-wrap' }}>
                  {post.optimizedCaption}
                </p>
              </div>
            ))}
          </div>
          {outputData.reportUrl && (
            <a href={outputData.reportUrl} target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '14px', background: '#6c63ff', color: 'white', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
              <Download size={14} /> Download Schedule Report
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Image size={18} color="#8b5cf6" />
            <h3 style={{ color: '#f0f0f8', fontWeight: 700, fontSize: '15px', margin: 0 }}>Social Media Captions ✅</h3>
          </div>
          {Object.entries(parsed).map(([platform, caption]) => (
            <div key={platform} style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ background: platformColors[platform] || '#6c63ff', padding: '5px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'white', fontSize: '11px', fontWeight: 700 }}>{platform}</span>
                <button onClick={() => navigator.clipboard.writeText(caption)}
                  style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>
                  Copy
                </button>
              </div>
              <p style={{ color: '#c0c0d8', fontSize: '12px', lineHeight: 1.6, margin: 0, padding: '10px 12px', whiteSpace: 'pre-wrap' }}>{caption}</p>
            </div>
          ))}
          {outputData.downloadUrl && (
            <a href={outputData.downloadUrl} target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '14px', background: '#6c63ff', color: 'white', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
              <Download size={14} /> Download Captions PDF
            </a>
          )}
        </div>
      );
    }

    if (outputType === 'LLM_OUTPUT' && outputData) {
      return (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <FileText size={18} color="#43e8b0" />
            <h3 style={{ color: '#f0f0f8', fontWeight: 700, fontSize: '15px', margin: 0 }}>Output Generated ✅</h3>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '16px', maxHeight: '280px', overflowY: 'auto', marginBottom: '14px' }}>
            <p style={{ color: '#d0d0e8', fontSize: '13px', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>
              {outputData.content}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => navigator.clipboard.writeText(outputData.content)}
              style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#d0d0e8', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <Copy size={14} /> Copy Text
            </button>
            {outputData.downloadUrl && (
              <a href={outputData.downloadUrl} target="_blank" rel="noreferrer"
                style={{ flex: 1, background: '#6c63ff', color: 'white', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Download size={14} /> Download PDF
              </a>
            )}
          </div>
        </div>
      );
    }

    if (outputType === 'PDF_REPORT' && outputData) {
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <FileText size={44} color="#6c63ff" style={{ margin: '0 auto 12px', display: 'block' }} />
          <h3 style={{ color: '#f0f0f8', fontWeight: 700, marginBottom: '6px' }}>Report Generated ✅</h3>
          <p style={{ color: '#7a7a9a', fontSize: '12px', marginBottom: '20px' }}>{outputData.filename}</p>
          <a href={outputData.downloadUrl} target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#6c63ff', color: 'white', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
            <Download size={16} /> Download PDF
          </a>
        </div>
      );
    }

    if (outputType === 'EMAIL' && outputData) {
      const results = outputData.results || [];
      const sent = results.filter((r: any) => r.success).length;
      return (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Mail size={18} color="#43e8b0" />
            <h3 style={{ color: '#f0f0f8', fontWeight: 700, fontSize: '15px', margin: 0 }}>
              {sent} of {results.length} Emails Sent ✅
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {results.map((r: any, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                {r.success ? <CheckCircle size={14} color="#43e8b0" /> : <AlertCircle size={14} color="#ef4444" />}
                <span style={{ color: '#c0c0d8', fontSize: '13px', flex: 1 }}>{r.to}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: r.success ? '#43e8b0' : '#ef4444' }}>{r.success ? 'Sent' : 'Failed'}</span>
              </div>
            ))}
          </div>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <TrendingUp size={18} color="#3b82f6" />
            <h3 style={{ color: '#f0f0f8', fontWeight: 700, fontSize: '15px', margin: 0 }}>Payment Report ✅</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            {[
              { label: 'Overdue Count', value: String(overdue.length), color: '#ef4444' },
              { label: 'Total Overdue', value: `Rs.${totalOverdue.toLocaleString('en-IN')}`, color: '#ef4444' },
              { label: 'Pending Count', value: String(pending.length), color: '#3b82f6' },
              { label: 'Total Pending', value: `Rs.${totalPending.toLocaleString('en-IN')}`, color: '#3b82f6' },
            ].map((card, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px' }}>
                <div style={{ fontSize: '11px', color: '#7a7a9a', marginBottom: '4px' }}>{card.label}</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: card.color }}>{card.value}</div>
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

    const isSuccess = status === 'SUCCESS';
    const isFailed = status === 'FAILED';
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          {isSuccess ? <CheckCircle size={18} color="#43e8b0" /> : isFailed ? <AlertCircle size={18} color="#ef4444" /> : <Clock size={18} color="#7a7a9a" />}
          <h3 style={{ color: '#f0f0f8', fontWeight: 700, fontSize: '15px', margin: 0 }}>
            {isSuccess ? 'Run Completed ✅' : isFailed ? 'Run Failed ❌' : 'Processing...'}
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '280px', overflowY: 'auto' }}>
          {logs.map((log, i) => (
            <div key={i} style={{
              padding: '7px 11px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: '12px',
              color: log.message?.includes('✅') ? '#43e8b0' : log.message?.includes('❌') ? '#ef4444' : '#9090b0',
              borderLeft: `2px solid ${log.message?.includes('✅') ? '#43e8b0' : log.message?.includes('❌') ? '#ef4444' : '#6c63ff'}`,
            }}>
              <span style={{ color: '#4a4a6a', marginRight: '8px', fontSize: '11px' }}>
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              {log.message}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', width: '100%', maxWidth: '540px', maxHeight: '82vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#f0f0f8' }}>{agentName}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span style={{ background: `${deptColor}20`, color: deptColor, padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600 }}>{department}</span>
              <span style={{ fontSize: '11px', color: status === 'SUCCESS' ? '#43e8b0' : status === 'FAILED' ? '#ef4444' : status === 'RUNNING' ? '#6c63ff' : '#f59e0b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                {status === 'RUNNING' && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6c63ff', animation: 'pulse 1s infinite' }} />}
                {status === 'SUCCESS' && <CheckCircle size={11} />}
                {status === 'FAILED' && <AlertCircle size={11} />}
                {status}
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#7a7a9a', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={15} />
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px' }}>
          {renderContent()}
        </div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}

// ─── Main AgentsPage ──────────────────────────────────────────────────────────
export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [agentsToDelete, setAgentsToDelete] = useState<Agent[]>([]);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [deletingIds, setDeletingIds] = useState<string[]>([]);
  const [runningIds, setRunningIds] = useState<string[]>([]);
  const [downloadingIds, setDownloadingIds] = useState<string[]>([]);
  const [showOutputModal, setShowOutputModal] = useState(false);
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);

  const departments = ['ALL', 'SALES', 'HR', 'MARKETING', 'FINANCE', 'SUPPORT'];
  const statuses = ['ALL', 'ACTIVE', 'DRAFT', 'PAUSED'];

  useEffect(() => { loadAgents(); }, []);

  useEffect(() => {
    const handler = () => setShowActionMenu(null);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const loadAgents = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/agents');
      setAgents(data.agents || []);
    } catch (error) {
      console.error('Failed to load agents:', normalizeApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAgent = (id: string) =>
    setSelectedAgents(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleSelectAll = () =>
    setSelectedAgents(selectedAgents.length === filteredAgents.length ? [] : filteredAgents.map(a => a.id));

  const handleDelete = (toDelete: Agent[]) => {
    setAgentsToDelete(toDelete);
    setShowDeleteModal(true);
    setShowActionMenu(null);
  };

  const confirmDelete = async () => {
    if (agentsToDelete.length === 0) return;
    setDeletingIds(agentsToDelete.map(a => a.id));
    const results = await Promise.allSettled(agentsToDelete.map(a => api.delete(`/api/agents/${a.id}`)));
    const succeeded = agentsToDelete.filter((_, i) => results[i].status === 'fulfilled');
    const failed = agentsToDelete.filter((_, i) => results[i].status === 'rejected');
    if (succeeded.length > 0) {
      const ids = succeeded.map(a => a.id);
      setAgents(prev => prev.filter(a => !ids.includes(a.id)));
      setSelectedAgents(prev => prev.filter(id => !ids.includes(id)));
    }
    setDeletingIds([]);
    setAgentsToDelete([]);
    setShowDeleteModal(false);
    if (failed.length > 0) alert(`${succeeded.length} deleted. ${failed.length} failed.`);
  };

  const handleRunAgent = async (agentId: string) => {
    if (!agentId || agentId === 'undefined' || agentId.length < 5) {
      alert('Invalid agent ID.');
      return;
    }
    const agent = agents.find(a => a.id === agentId);
    if (!agent) { alert('Agent not found.'); return; }

    setRunningIds(prev => [...prev, agentId]);
    try {
      await api.post(`/api/agents/${agentId}/run`);
      setActiveAgent(agent);
      setShowOutputModal(true);
      setTimeout(() => loadAgents(), 5000);
    } catch (error) {
      alert(`Failed to run agent: ${normalizeApiError(error).message}`);
    } finally {
      setRunningIds(prev => prev.filter(id => id !== agentId));
    }
  };

  const handleCloneAgent = async (agent: Agent) => {
    try {
      const { data } = await api.post(`/api/agents/${agent.id}/clone`);
      setAgents(prev => [data.agent, ...prev]);
    } catch (error) {
      alert(`Failed to clone: ${normalizeApiError(error).message}`);
    }
    setShowActionMenu(null);
  };

  // ─── FIXED: PDF Download ───────────────────────────────────────────────────
  const handleDownloadPDF = async (agentId: string, agentName: string) => {
    setDownloadingIds(prev => [...prev, agentId]);
    setShowActionMenu(null);

    try {
      // Step 1: Get the latest run for this agent
      const { data } = await api.get(`/api/execute/${agentId}/runs`);
      const runs = data.runs || [];

      if (runs.length === 0) {
        alert('No runs found. Please run the agent first.');
        return;
      }

      const latestRun = runs[0];
      const logs = Array.isArray(latestRun.logs) ? latestRun.logs : [];

      // Step 2: Check logs for an existing downloadUrl (e.g. from disk-saved reports)
      for (const log of logs) {
        if (log.data?.downloadUrl) {
          window.open(log.data.downloadUrl, '_blank');
          return;
        }
      }

      // Step 3: Fallback — call the backend PDF endpoint to generate on-the-fly
      // Must use responseType: 'blob' so axios doesn't corrupt the binary
      const response = await api.post(
        `/api/pdf/agent/${latestRun.id}`,
        {},
        { responseType: 'blob' }
      );

      // Step 4: Trigger browser download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${agentName.replace(/[^a-z0-9]/gi, '_')}_report_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      alert(`Failed to download PDF: ${normalizeApiError(error).message}`);
    } finally {
      setDownloadingIds(prev => prev.filter(id => id !== agentId));
    }
  };

  const getStatusIcon = (s: string) => {
    switch (s?.toUpperCase()) {
      case 'ACTIVE': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'DRAFT': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'PAUSED': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (s: string) => {
    switch (s?.toUpperCase()) {
      case 'ACTIVE': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'DRAFT': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'PAUSED': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getDeptColor = (d: string) => {
    const c: Record<string, string> = {
      SALES: 'bg-amber-500/10 text-amber-400', HR: 'bg-emerald-500/10 text-emerald-400',
      MARKETING: 'bg-purple-500/10 text-purple-400', FINANCE: 'bg-blue-500/10 text-blue-400',
      SUPPORT: 'bg-rose-500/10 text-rose-400',
    };
    return c[d] || 'bg-slate-500/10 text-slate-400';
  };

  const getRunColor = (s: string) => {
    switch (s?.toUpperCase()) {
      case 'SUCCESS': return 'text-green-400';
      case 'FAILED': return 'text-red-400';
      case 'RUNNING': return 'text-blue-400';
      default: return 'text-slate-400';
    }
  };

  const filteredAgents = agents.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = filterDepartment === 'ALL' || a.department === filterDepartment;
    const matchStatus = filterStatus === 'ALL' || a.status === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4" />
          <p className="text-slate-300">Loading your agents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* Header */}
      <div className="border-b border-slate-800 px-6 py-4 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="w-7 h-7 text-indigo-400" />
            <h1 className="text-xl font-bold">My Agents</h1>
            <span className="text-sm text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">{filteredAgents.length}</span>
          </div>
          <button onClick={() => window.location.href = '/'} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
            <Plus className="w-4 h-4" /> New Agent
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-slate-800 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-48 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input type="text" placeholder="Search agents..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="bg-transparent text-white text-sm outline-none w-full placeholder-slate-500" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select value={filterDepartment} onChange={e => setFilterDepartment(e.target.value)} className="px-3 py-2 bg-slate-800 text-white text-sm rounded-lg border border-slate-700 outline-none">
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 bg-slate-800 text-white text-sm rounded-lg border border-slate-700 outline-none">
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {selectedAgents.length > 0 && (
            <button onClick={() => handleDelete(agents.filter(a => selectedAgents.includes(a.id)))} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1 transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> Delete {selectedAgents.length} selected
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {filteredAgents.length === 0 ? (
          <div className="text-center py-20">
            <Bot className="w-14 h-14 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-300 mb-2">No agents found</h3>
            <p className="text-slate-500 mb-6 text-sm">{searchTerm || filterDepartment !== 'ALL' || filterStatus !== 'ALL' ? 'Try adjusting your filters.' : 'Start by creating your first AI agent.'}</p>
            <button onClick={() => window.location.href = '/'} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm transition-colors">Create First Agent</button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" checked={selectedAgents.length === filteredAgents.length && filteredAgents.length > 0} onChange={handleSelectAll} className="w-4 h-4 accent-indigo-500" />
              <span className="text-xs text-slate-500">Select all</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAgents.map(agent => (
                <div key={agent.id} className={`rounded-xl border p-5 transition-all bg-slate-800/50 ${selectedAgents.includes(agent.id) ? 'border-indigo-500 ring-1 ring-indigo-500/30' : 'border-slate-700/50 hover:border-slate-600'}`}>

                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <input type="checkbox" checked={selectedAgents.includes(agent.id)} onChange={() => handleSelectAgent(agent.id)} className="w-4 h-4 accent-indigo-500 mt-1 flex-shrink-0" />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-white truncate">{agent.name}</h3>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{agent.description}</p>
                      </div>
                    </div>
                    <div className="relative flex-shrink-0 ml-2">
                      <button onClick={e => { e.stopPropagation(); setShowActionMenu(showActionMenu === agent.id ? null : agent.id); }} className="p-1 text-slate-500 hover:text-white transition-colors rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {showActionMenu === agent.id && (
                        <div className="absolute right-0 top-7 w-44 bg-slate-700 border border-slate-600 rounded-lg shadow-xl z-20" onClick={e => e.stopPropagation()}>
                          {[
                            { icon: Play, label: 'Run Agent', action: () => { handleRunAgent(agent.id); setShowActionMenu(null); } },
                            { icon: Copy, label: 'Clone Agent', action: () => handleCloneAgent(agent) },
                            ...(agent.department === 'MARKETING' ? [{
                              icon: Link,
                              label: 'Connect LinkedIn',
                              action: async () => {
                                try {
                                  const { data } = await api.get('/api/linkedin/status');
                                  if (!data.connected) {
                                    const { data: authData } = await api.get('/api/linkedin/auth');
                                    window.open(authData.authUrl, '_blank');
                                  } else {
                                    alert(`LinkedIn Connected ✅\nConnected as: ${data.name}`);
                                  }
                                } catch (error) {
                                  alert('Failed to check LinkedIn status');
                                }
                                setShowActionMenu(null);
                              }
                            }] : []),
                            {
                              icon: Download,
                              label: downloadingIds.includes(agent.id) ? 'Downloading...' : 'Download PDF',
                              action: () => handleDownloadPDF(agent.id, agent.name),
                            },
                          ].map(({ icon: Icon, label, action }) => (
                            <button key={label} onClick={action} disabled={label === 'Downloading...'} className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-600 disabled:opacity-50 transition-colors flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5" />{label}
                            </button>
                          ))}
                          <div className="border-t border-slate-600 my-1" />
                          <button onClick={() => handleDelete([agent])} className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-slate-600 transition-colors flex items-center gap-2">
                            <Trash2 className="w-3.5 h-3.5" />Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getDeptColor(agent.department)}`}>{agent.department}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full border font-medium flex items-center gap-1 ${getStatusColor(agent.status)}`}>{getStatusIcon(agent.status)}{agent.status}</span>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-slate-700 text-slate-400">{agent.trigger}</span>
                  </div>

                  {agent.tools.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {agent.tools.slice(0, 3).map((tool, i) => (
                        <span key={i} className="px-1.5 py-0.5 text-xs bg-slate-700/50 text-slate-400 rounded border border-slate-700">{tool}</span>
                      ))}
                      {agent.tools.length > 3 && <span className="px-1.5 py-0.5 text-xs bg-slate-700/50 text-slate-500 rounded border border-slate-700">+{agent.tools.length - 3}</span>}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span>{agent.runCount || 0} runs</span>
                    {agent.lastRun && <span className={`font-medium ${getRunColor(agent.lastRun.status)}`}>Last: {agent.lastRun.status}</span>}
                    <span>{new Date(agent.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-slate-700/50">
                    <button
                      onClick={() => handleRunAgent(agent.id)}
                      disabled={runningIds.includes(agent.id)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      {runningIds.includes(agent.id) ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Play className="w-3 h-3" />}
                      {runningIds.includes(agent.id) ? 'Running...' : 'Run'}
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(agent.id, agent.name)}
                      disabled={downloadingIds.includes(agent.id)}
                      className="flex-1 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      {downloadingIds.includes(agent.id) ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download className="w-3 h-3" />}
                      {downloadingIds.includes(agent.id) ? 'Downloading...' : 'PDF'}
                    </button>
                    <button
                      onClick={() => handleDelete([agent])}
                      disabled={deletingIds.includes(agent.id)}
                      className="flex-1 bg-red-600/80 hover:bg-red-600 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      {deletingIds.includes(agent.id) ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Trash2 className="w-3 h-3" />}
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Delete {agentsToDelete.length} Agent{agentsToDelete.length !== 1 ? 's' : ''}?</h3>
              <p className="text-sm text-slate-400">This cannot be undone.</p>
            </div>
            {agentsToDelete.length > 0 && (
              <div className="bg-slate-700/50 rounded-lg p-3 mb-5">
                <p className="text-xs text-slate-400 mb-2">Agents to delete:</p>
                <ul className="space-y-1">
                  {agentsToDelete.map(a => (
                    <li key={a.id} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
                      {a.name}
                      <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${getDeptColor(a.department)}`}>{a.department}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteModal(false); setAgentsToDelete([]); }} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">Cancel</button>
              <button onClick={confirmDelete} disabled={deletingIds.length > 0} className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                {deletingIds.length > 0 ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Deleting...</> : <><Trash2 className="w-3.5 h-3.5" />Delete {agentsToDelete.length === 1 ? 'Agent' : 'Agents'}</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Run Output Modal */}
      {showOutputModal && activeAgent && activeAgent.id && (
        <RunOutputModal
          agentId={activeAgent.id}
          agentName={activeAgent.name}
          department={activeAgent.department}
          onClose={() => {
            setShowOutputModal(false);
            setActiveAgent(null);
            loadAgents();
          }}
        />
      )}
    </div>
  );
}