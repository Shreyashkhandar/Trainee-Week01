'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ComplaintForm } from '@/components/complaint-form';
import { StatusBadge } from '@/components/status-badge';
import { ApiError, api } from '@/services/api';
import type { Complaint, ComplaintInput, ComplaintPriority, ComplaintStatus, Facility } from '@/types/domain';
import { formatDate } from '@/utils/format';

const priorities: ComplaintPriority[] = ['Low', 'Medium', 'High', 'Critical'];
const statuses: ComplaintStatus[] = ['Open', 'In Progress', 'Resolved'];

export default function ComplaintsPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState<ComplaintPriority | ''>('');
  const [status, setStatus] = useState<ComplaintStatus | ''>('');
  const [editing, setEditing] = useState<Complaint | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [reload, setReload] = useState(0);

  const filteredComplaints = useMemo(() => {
    const query = search.trim().toLowerCase();
    return complaints.filter((complaint) => {
      const matchesSearch = !query || [complaint.title, complaint.description, complaint.facilityName ?? '', complaint.reportedBy].some((value) => value.toLowerCase().includes(query));
      const matchesPriority = !priority || complaint.priority === priority;
      const matchesStatus = !status || complaint.status === status;
      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [complaints, priority, search, status]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    Promise.all([
      api.getFacilities(),
      api.getComplaints({ search, priority: priority || undefined, status: status || undefined })
    ]).then(([nextFacilities, nextComplaints]) => {
      if (!mounted) return;
      setFacilities(nextFacilities);
      setComplaints(nextComplaints);
    }).catch((cause: unknown) => {
      if (!mounted) return;
      setError(cause instanceof ApiError ? cause.message : 'Complaints could not be loaded.');
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, [priority, reload, search, status]);

  async function saveComplaint(input: ComplaintInput) {
    setSaving(true);
    setError('');
    try {
      if (editing) await api.updateComplaint(editing.id, input);
      else await api.createComplaint(input);
      setMessage(editing ? 'Complaint updated.' : 'Complaint created.');
      setEditing(null);
      setFormOpen(false);
      setReload((current) => current + 1);
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : 'Complaint could not be saved.');
    } finally { setSaving(false); }
  }

  async function removeComplaint(complaint: Complaint) {
    if (!window.confirm(`Delete complaint "${complaint.title}"?`)) return;
    setError('');
    try {
      await api.deleteComplaint(complaint.id);
      setMessage('Complaint deleted.');
      setReload((current) => current + 1);
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : 'Complaint could not be deleted.');
    }
  }

  function startCreate() { setEditing(null); setFormOpen(true); setMessage(''); }
  function startEdit(complaint: Complaint) { setEditing(complaint); setFormOpen(true); setMessage(''); }

  return (
    <main className="page-content">
      <div className="page-heading"><div><p className="eyebrow">Operations / service requests</p><h1>Complaints</h1><p className="page-subtitle">Review issues by urgency, location, and current resolution state.</p></div><button className="button" onClick={startCreate}>Add complaint</button></div>
      {message && <div className="success-box" role="status">{message}</div>}
      {error && <div className="error-box" role="alert">{error} <button className="button button--light" onClick={() => setReload((current) => current + 1)}>Retry</button></div>}
      <section aria-label="Complaint filters" className="toolbar">
        <div className="field field--grow"><label htmlFor="complaint-search">Search</label><input id="complaint-search" placeholder="Title, description, facility" value={search} onChange={(event) => setSearch(event.target.value)} /></div>
        <div className="field"><label htmlFor="complaint-priority-filter">Priority</label><select id="complaint-priority-filter" value={priority} onChange={(event) => setPriority(event.target.value as ComplaintPriority | '')}><option value="">All priorities</option>{priorities.map((item) => <option key={item}>{item}</option>)}</select></div>
        <div className="field"><label htmlFor="complaint-status-filter">Status</label><select id="complaint-status-filter" value={status} onChange={(event) => setStatus(event.target.value as ComplaintStatus | '')}><option value="">All status</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select></div>
      </section>
      {formOpen && <ComplaintForm facilities={facilities} initial={editing} saving={saving} onSave={saveComplaint} onCancel={() => { setFormOpen(false); setEditing(null); }} />}
      {loading && <div className="loading-state" role="status">Loading complaints…</div>}
      {!loading && !error && filteredComplaints.length === 0 && <div className="empty-state">No complaints match the current filters.</div>}
      {!loading && filteredComplaints.length > 0 && <section className="panel"><div className="panel-heading"><h2>Complaint register</h2><span className="code-label">{filteredComplaints.length} records</span></div><div className="table-scroll table-scroll--cards"><table className="data-table"><thead><tr><th>Facility</th><th>Title</th><th>Type</th><th>Priority</th><th>Status</th><th>Reported</th><th>Actions</th></tr></thead><tbody>{filteredComplaints.map((complaint) => <tr key={complaint.id}><td data-label="Facility"><strong>{complaint.facilityName ?? 'Facility'}</strong><span className="code-label">{complaint.facilityCode ?? 'N/A'}</span></td><td data-label="Title"><Link className="section-link" href={`/facilities/${complaint.facilityId}`}>{complaint.title}</Link></td><td data-label="Type">{complaint.complaintType}</td><td data-label="Priority"><StatusBadge kind="priority" value={complaint.priority} /></td><td data-label="Status"><StatusBadge kind="complaint" value={complaint.status} /></td><td data-label="Reported">{formatDate(complaint.createdAt)}</td><td data-label="Actions"><div className="button-row"><button className="button button--light" onClick={() => startEdit(complaint)}>Edit</button><button className="button button--danger" onClick={() => void removeComplaint(complaint)}>Delete</button></div></td></tr>)}</tbody></table></div></section>}
    </main>
  );
}
