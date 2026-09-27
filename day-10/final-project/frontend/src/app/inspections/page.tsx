'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { InspectionForm } from '@/components/inspection-form';
import { StatusBadge } from '@/components/status-badge';
import { ApiError, api } from '@/services/api';
import type { Facility, Inspection, InspectionInput, InspectionStatus } from '@/types/domain';
import { formatDate } from '@/utils/format';

const statuses: InspectionStatus[] = ['Pending', 'Completed', 'Needs Follow-up'];

export default function InspectionsPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [facilityFilter, setFacilityFilter] = useState<number | ''>('');
  const [statusFilter, setStatusFilter] = useState<InspectionStatus | ''>('');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Inspection | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [reload, setReload] = useState(0);

  const filteredInspections = useMemo(() => {
    const query = search.trim().toLowerCase();
    return inspections.filter((inspection) => {
      const matchesSearch = !query || [inspection.inspectorName, inspection.remarks, inspection.facilityName ?? '', inspection.facilityCode ?? ''].some((value) => value.toLowerCase().includes(query));
      const matchesFacility = !facilityFilter || inspection.facilityId === Number(facilityFilter);
      const matchesStatus = !statusFilter || inspection.status === statusFilter;
      return matchesSearch && matchesFacility && matchesStatus;
    });
  }, [facilityFilter, inspections, search, statusFilter]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    Promise.all([
      api.getFacilities(),
      api.getInspections({ facilityId: facilityFilter ? Number(facilityFilter) : undefined, status: statusFilter || undefined })
    ]).then(([nextFacilities, nextInspections]) => {
      if (!mounted) return;
      setFacilities(nextFacilities);
      setInspections(nextInspections);
    }).catch((cause: unknown) => {
      if (!mounted) return;
      setError(cause instanceof ApiError ? cause.message : 'Inspections could not be loaded.');
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, [facilityFilter, reload, statusFilter]);

  async function saveInspection(input: InspectionInput) {
    setSaving(true);
    setError('');
    try {
      if (editing) await api.updateInspection(editing.id, input);
      else await api.createInspection(input);
      setMessage(editing ? 'Inspection updated.' : 'Inspection created.');
      setEditing(null);
      setFormOpen(false);
      setReload((current) => current + 1);
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : 'Inspection could not be saved.');
    } finally { setSaving(false); }
  }

  async function removeInspection(inspection: Inspection) {
    if (!window.confirm(`Delete inspection for ${inspection.facilityName ?? 'this facility'}?`)) return;
    setError('');
    try {
      await api.deleteInspection(inspection.id);
      setMessage('Inspection deleted.');
      setReload((current) => current + 1);
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : 'Inspection could not be deleted.');
    }
  }

  function startCreate() { setEditing(null); setFormOpen(true); setMessage(''); }
  function startEdit(inspection: Inspection) { setEditing(inspection); setFormOpen(true); setMessage(''); }

  return (
    <main className="page-content">
      <div className="page-heading"><div><p className="eyebrow">Operations / inspection log</p><h1>Inspections</h1><p className="page-subtitle">Track facility health checks and follow-up actions.</p></div><button className="button" onClick={startCreate}>Add inspection</button></div>
      {message && <div className="success-box" role="status">{message}</div>}
      {error && <div className="error-box" role="alert">{error} <button className="button button--light" onClick={() => setReload((current) => current + 1)}>Retry</button></div>}
      <section aria-label="Inspection filters" className="toolbar">
        <div className="field field--grow"><label htmlFor="inspection-search">Search</label><input id="inspection-search" placeholder="Inspector, remarks, facility" value={search} onChange={(event) => setSearch(event.target.value)} /></div>
        <div className="field"><label htmlFor="inspection-facility-filter">Facility</label><select id="inspection-facility-filter" value={facilityFilter} onChange={(event) => setFacilityFilter(event.target.value ? Number(event.target.value) : '')}><option value="">All facilities</option>{facilities.map((facility) => <option key={facility.id} value={facility.id}>{facility.name}</option>)}</select></div>
        <div className="field"><label htmlFor="inspection-status-filter">Status</label><select id="inspection-status-filter" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as InspectionStatus | '')}><option value="">All status</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div>
      </section>
      {formOpen && <InspectionForm facilities={facilities} initial={editing} saving={saving} onSave={saveInspection} onCancel={() => { setFormOpen(false); setEditing(null); }} />}
      {loading && <div className="loading-state" role="status">Loading inspections…</div>}
      {!loading && !error && filteredInspections.length === 0 && <div className="empty-state">No inspections match the current filters.</div>}
      {!loading && filteredInspections.length > 0 && <section className="panel"><div className="panel-heading"><h2>Inspection log</h2><span className="code-label">{filteredInspections.length} records</span></div><div className="table-scroll table-scroll--cards"><table className="data-table"><thead><tr><th>Facility</th><th>Date</th><th>Inspector</th><th>Score</th><th>Status</th><th>Remarks</th><th>Actions</th></tr></thead><tbody>{filteredInspections.map((inspection) => <tr key={inspection.id}><td data-label="Facility"><strong>{inspection.facilityName ?? 'Facility'}</strong><span className="code-label">{inspection.facilityCode ?? 'N/A'}</span></td><td data-label="Date">{formatDate(inspection.inspectionDate)}</td><td data-label="Inspector">{inspection.inspectorName}</td><td data-label="Score">{inspection.cleanlinessScore}%</td><td data-label="Status"><StatusBadge kind="inspection" value={inspection.status} /></td><td data-label="Remarks">{inspection.remarks}</td><td data-label="Actions"><div className="button-row"><button className="button button--light" onClick={() => startEdit(inspection)}>Edit</button><button className="button button--danger" onClick={() => void removeInspection(inspection)}>Delete</button></div></td></tr>)}</tbody></table></div></section>}
      {!loading && facilities.length === 0 && !formOpen && <div className="empty-state">Add a facility before creating inspections.</div>}
      {!loading && facilities.length > 0 && !formOpen && <div className="pagination-note">Use the filters to narrow activity by site or inspection status.</div>}
    </main>
  );
}
