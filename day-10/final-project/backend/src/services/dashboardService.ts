import type { RowDataPacket } from 'mysql2';
import { pool } from '../config/database.js';
import type { DashboardMetrics } from '../models/dashboard.js';

type MetricsRow = RowDataPacket & DashboardMetrics;

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const [rows] = await pool.query<MetricsRow[]>(`
    SELECT
      (SELECT COUNT(*) FROM facilities) AS totalFacilities,
      (SELECT COUNT(*) FROM facilities WHERE status = 'Active') AS activeFacilities,
      (SELECT COUNT(*) FROM inspections WHERE status = 'Pending') AS pendingInspections,
      (SELECT COUNT(*) FROM inspections WHERE status = 'Completed') AS completedInspections,
      (SELECT COUNT(*) FROM complaints WHERE status <> 'Resolved') AS openComplaints,
      (SELECT COUNT(*) FROM complaints WHERE priority = 'Critical' AND status <> 'Resolved') AS criticalComplaints,
      COALESCE((SELECT ROUND(AVG(cleanliness_score), 1) FROM facilities WHERE status = 'Active'), 0) AS averageCleanlinessScore
  `);
  return rows[0];
}