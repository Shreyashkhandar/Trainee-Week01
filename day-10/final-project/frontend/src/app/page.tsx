'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MetricCard } from '@/components/metric-card';
import { ApiError, api } from '@/services/api';
import type { DashboardMetrics, Facility } from '@/types/domain';

const emptyMetrics: DashboardMetrics = {
  totalFacilities: 0,
  activeFacilities: 0,
  pendingInspections: 0,
  completedInspections: 0,
  openComplaints: 0,
  criticalComplaints: 0,
  averageCleanlinessScore: 0
};

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(emptyMetrics);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadDashboard() {
    setLoading(true);
    setError('');
    try {
      const [nextMetrics, nextFacilities] = await Promise.all([
        api.getMetrics(),
        api.getFacilities({ sort: 'score' })
      ]);
      setMetrics(nextMetrics);
      setFacilities(nextFacilities.slice(0, 5));
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : 'Dashboard data could not be loaded.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadDashboard(); }, []);

  return (
    <main className="page-content">
      <div className="page-heading">
        <div><p className="eyebrow">Facility operations / overview</p><h1>Good morning, team.</h1><p className="page-subtitle">A current view of inspections and facility health.</p></div>
        <div className="button-row"><Link className="button button--light" href="/facilities">Browse facilities</Link><Link className="button" href="/inspections">New inspection</Link></div>
      </div>

      {loading && <div className="loading-state" role="status">Loading facility data…</div>}
      {error && <div className="error-box" role="alert"><p>{error}</p><button className="button button--light" onClick={() => void loadDashboard()}>Try again</button></div>}
      {!loading && !error && <>
        <section aria-label="Dashboard metrics" className="metric-grid">
          <MetricCard label="Total facilities" value={metrics.totalFacilities} />
          <MetricCard label="Active facilities" value={metrics.activeFacilities} tone="blue" />
          <MetricCard label="Pending inspections" value={metrics.pendingInspections} tone="gold" />
          <MetricCard label="Completed inspections" value={metrics.completedInspections} />
          <MetricCard label="Open complaints" value={metrics.openComplaints} tone="clay" />
          <MetricCard label="Critical complaints" value={metrics.criticalComplaints} tone="clay" />
          <MetricCard label="Average cleanliness" value={`${metrics.averageCleanlinessScore}%`} tone="gold" />
        </section>

        <section className="dashboard-lower">
          <div className="panel">
            <div className="panel-heading"><h2>Facilities to watch</h2><Link className="section-link" href="/facilities">All facilities →</Link></div>
            {facilities.length === 0 ? <div className="empty-state">No facilities are registered yet.</div> : <div className="table-scroll table-scroll--cards">
              <table className="data-table"><thead><tr><th>Facility</th><th>Location</th><th>Status</th><th>Cleanliness</th></tr></thead>
                <tbody>{facilities.map((facility) => <tr key={facility.id}>
                  <td data-label="Facility"><strong>{facility.name}</strong><span className="code-label">{facility.facilityCode}</span></td>
                  <td data-label="Location">{facility.location}</td>
                  <td data-label="Status"><span className={`badge${facility.status === 'Under Maintenance' ? ' badge--warning' : facility.status === 'Inactive' ? ' badge--muted' : ''}`}>{facility.status}</span></td>
                  <td data-label="Cleanliness">{facility.cleanlinessScore}%</td>
                </tr>)}</tbody>
              </table>
            </div>}
          </div>
          <div className="panel">
            <div className="panel-heading"><h2>Cleanliness scores</h2></div>
            {facilities.length === 0 ? <div className="empty-state">Scores will appear after facilities are added.</div> : <div className="chart-list">
              {facilities.map((facility) => <div className="chart-row" key={facility.id}>
                <span className="chart-name" title={facility.name}>{facility.name}</span>
                <div aria-label={`${facility.cleanlinessScore}%`} className="chart-track"><div className="chart-fill" style={{ width: `${facility.cleanlinessScore}%` }} /></div>
                <span className="chart-score">{facility.cleanlinessScore}</span>
              </div>)}
            </div>}
          </div>
        </section>
      </>}
    </main>
  );
}
