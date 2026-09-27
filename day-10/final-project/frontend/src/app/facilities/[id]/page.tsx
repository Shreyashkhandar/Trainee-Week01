'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { StatusBadge } from '@/components/status-badge';
import { ApiError, api } from '@/services/api';
import type { Complaint, Facility, Inspection } from '@/types/domain';
import { formatDate } from '@/utils/format';

export default function FacilityDetailsPage() {
  const { id: routeId } = useParams<{ id: string }>();
  const facilityId = Number(routeId);
  const [facility, setFacility] = useState<Facility | null>(null);
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadDetails() {
    setLoading(true);
    setError('');
    try {
      const [nextFacility, nextInspections, nextComplaints] = await Promise.all([
        api.getFacility(facilityId),
        api.getFacilityInspections(facilityId),
        api.getComplaints({ facilityId })
      ]);
      setFacility(nextFacility);
      setInspections(nextInspections);
      setComplaints(nextComplaints);
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : 'Facility details could not be loaded.');
    } finally { setLoading(false); }
  }

  useEffect(() => { void loadDetails(); }, [facilityId]);

  return (
    <main className="page-content">
      <div className="page-heading"><div><p className="eyebrow">Facility profile</p><h1>{facility?.name ?? 'Facility details'}</h1></div><Link className="button button--light" href="/facilities">Back to facilities</Link></div>
      {loading && <div className="loading-state" role="status">Loading facility record…</div>}
      {error && <div className="error-box" role="alert">{error} <button className="button button--light" onClick={() => void loadDetails()}>Retry</button></div>}
      {!loading && facility && <>
        <section className="detail-grid">
          <article className="panel"><div className="panel-heading"><h2>Facility information</h2><StatusBadge value={facility.status} /></div>
            <div className="detail-list">
              <div className="detail-item"><span>Facility code</span><strong>{facility.facilityCode}</strong></div>
              <div className="detail-item"><span>Facility type</span><strong>{facility.facilityType}</strong></div>
              <div className="detail-item"><span>Location</span><strong>{facility.location}</strong></div>
              <div className="detail-item"><span>Cleanliness score</span><strong>{facility.cleanlinessScore}%</strong></div>
              <div className="detail-item"><span>Last inspection</span><strong>{formatDate(facility.lastInspectionDate)}</strong></div>
              <div className="detail-item"><span>Open complaints</span><strong>{complaints.filter((item) => item.status !== 'Resolved').length}</strong></div>
            </div>
          </article>
          <article className="panel"><div className="panel-heading"><h2>Latest inspection</h2></div>
            {inspections[0] ? <div className="record-list"><div className="record-card"><div className="record-top"><StatusBadge kind="inspection" value={inspections[0].status} /><span className="code-label">{formatDate(inspections[0].inspectionDate)}</span></div><p className="record-title">{inspections[0].cleanlinessScore}% cleanliness · {inspections[0].inspectorName}</p><p className="record-body">Odor {inspections[0].odorScore}% · Waste {inspections[0].wasteLevel} · Water {inspections[0].waterAvailability ? 'available' : 'unavailable'}</p><p className="record-body">{inspections[0].remarks}</p></div></div> : <div className="empty-state">No inspections have been recorded.</div>}
          </article>
        </section>
        <section className="dashboard-lower">
          <div className="panel"><div className="panel-heading"><h2>Inspection history</h2><Link className="section-link" href={`/inspections?facilityId=${facility.id}`}>Manage inspections →</Link></div>
            {inspections.length === 0 ? <div className="empty-state">No inspection history is available.</div> : <div className="record-list">{inspections.map((inspection) => <article className="record-card" key={inspection.id}><div className="record-top"><p className="record-title">{inspection.inspectorName}</p><StatusBadge kind="inspection" value={inspection.status} /></div><p className="record-meta">{formatDate(inspection.inspectionDate)} · Cleanliness {inspection.cleanlinessScore}% · Odor {inspection.odorScore}% · Waste {inspection.wasteLevel}</p><p className="record-body">{inspection.remarks}</p></article>)}</div>}
          </div>
          <div className="panel"><div className="panel-heading"><h2>Complaints</h2><Link className="section-link" href={`/complaints?facilityId=${facility.id}`}>Manage complaints →</Link></div>
            {complaints.length === 0 ? <div className="empty-state">No complaints have been reported.</div> : <div className="record-list">{complaints.slice(0, 6).map((complaint) => <article className="record-card" key={complaint.id}><div className="record-top"><p className="record-title">{complaint.title}</p><StatusBadge kind="priority" value={complaint.priority} /></div><p className="record-meta">{complaint.complaintType} · {formatDate(complaint.createdAt)} · {complaint.status}</p><p className="record-body">{complaint.description}</p></article>)}</div>}
          </div>
        </section>
      </>}
    </main>
  );
}