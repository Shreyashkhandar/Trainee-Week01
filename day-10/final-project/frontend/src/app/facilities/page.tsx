'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FacilityForm } from '@/components/facility-form';
import { StatusBadge } from '@/components/status-badge';
import { ApiError, api } from '@/services/api';
import type { Facility, FacilityInput, FacilityStatus, FacilityType } from '@/types/domain';
import { formatDate } from '@/utils/format';

const statuses: FacilityStatus[] = ['Active', 'Under Maintenance', 'Inactive'];
const types: FacilityType[] = ['Clinic', 'Warehouse', 'Training Center', 'Laboratory', 'Office', 'Community Center'];

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<FacilityStatus | ''>('');
  const [type, setType] = useState<FacilityType | ''>('');
  const [sort, setSort] = useState('name');
  const [editing, setEditing] = useState<Facility | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    api.getFacilities({ search, status, type, sort }).then((items) => {
      if (mounted) setFacilities(items);
    }).catch((cause: unknown) => {
      if (mounted) setError(cause instanceof ApiError ? cause.message : 'Facilities could not be loaded.');
    }).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [search, status, type, sort, reload]);

  async function saveFacility(input: FacilityInput) {
    setSaving(true);
    setError('');
    try {
      if (editing) await api.updateFacility(editing.id, input);
      else await api.createFacility(input);
      setMessage(editing ? 'Facility changes saved.' : 'Facility created.');
      setEditing(null);
      setFormOpen(false);
      setReload((current) => current + 1);
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : 'Facility could not be saved.');
    } finally { setSaving(false); }
  }

  async function removeFacility(facility: Facility) {
    if (!window.confirm(`Delete ${facility.name}? Its inspections and complaints will also be deleted.`)) return;
    setError('');
    try {
      await api.deleteFacility(facility.id);
      setMessage('Facility and related records deleted.');
      setReload((current) => current + 1);
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : 'Facility could not be deleted.');
    }
  }

  function startCreate() { setEditing(null); setFormOpen(true); setMessage(''); }
  function startEdit(facility: Facility) { setEditing(facility); setFormOpen(true); setMessage(''); }

  return (
    <main className="page-content">
      <div className="page-heading"><div><p className="eyebrow">Operations / records</p><h1>Facilities</h1><p className="page-subtitle">Manage sites and review current inspection status.</p></div><button className="button" onClick={startCreate}>Add facility</button></div>
      {message && <div className="success-box" role="status">{message}</div>}
      {error && <div className="error-box" role="alert">{error} <button className="button button--light" onClick={() => setReload((current) => current + 1)}>Retry</button></div>}
      <section aria-label="Facility filters" className="toolbar">
        <div className="field field--grow"><label htmlFor="facility-search">Search</label><input id="facility-search" placeholder="Name, code, or location" value={search} onChange={(event) => setSearch(event.target.value)} /></div>
        <div className="field"><label htmlFor="status-filter">Status</label><select id="status-filter" value={status} onChange={(event) => setStatus(event.target.value as FacilityStatus | '')}><option value="">All statuses</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select></div>
        <div className="field"><label htmlFor="type-filter">Facility type</label><select id="type-filter" value={type} onChange={(event) => setType(event.target.value as FacilityType | '')}><option value="">All types</option>{types.map((item) => <option key={item}>{item}</option>)}</select></div>
        <div className="field"><label htmlFor="facility-sort">Sort by</label><select id="facility-sort" value={sort} onChange={(event) => setSort(event.target.value)}><option value="name">Name</option><option value="score">Cleanliness score</option><option value="inspectionDate">Last inspection</option></select></div>
      </section>
      {formOpen && <FacilityForm key={editing?.id ?? 'new'} initial={editing} saving={saving} onSave={saveFacility} onCancel={() => { setFormOpen(false); setEditing(null); }} />}
      {loading && <div className="loading-state" role="status">Loading facilities…</div>}
      {!loading && !error && facilities.length === 0 && <div className="empty-state">No facilities match these filters.</div>}
      {!loading && facilities.length > 0 && <section aria-label="Facilities list" className="panel"><div className="panel-heading"><h2>Facility register</h2><span className="code-label">{facilities.length} records</span></div><div className="table-scroll table-scroll--cards">
        <table className="data-table"><thead><tr><th>Facility</th><th>Location</th><th>Type</th><th>Status</th><th>Cleanliness</th><th>Last inspection</th><th>Actions</th></tr></thead>
          <tbody>{facilities.map((facility) => <tr key={facility.id}>
            <td data-label="Facility"><Link className="section-link" href={`/facilities/${facility.id}`}>{facility.name}</Link><span className="code-label">{facility.facilityCode}</span></td>
            <td data-label="Location">{facility.location}</td><td data-label="Type">{facility.facilityType}</td>
            <td data-label="Status"><StatusBadge value={facility.status} /></td><td data-label="Cleanliness">{facility.cleanlinessScore}%</td>
            <td data-label="Last inspection">{formatDate(facility.lastInspectionDate)}</td>
            <td data-label="Actions"><div className="button-row"><button className="button button--light" onClick={() => startEdit(facility)}>Edit</button><button className="button button--danger" onClick={() => void removeFacility(facility)}>Delete</button></div></td>
          </tr>)}</tbody>
        </table>
      </div></section>}
    </main>
  );
}