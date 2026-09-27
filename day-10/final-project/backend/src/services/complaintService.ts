import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/database.js';
import type { Complaint, ComplaintInput } from '../models/complaint.js';
import { HttpError } from '../utils/httpError.js';
import { getFacilityById } from './facilityService.js';

type ComplaintRow = RowDataPacket & Complaint;

const columns = `c.id, c.facility_id AS facilityId, c.title, c.description,
  c.complaint_type AS complaintType, c.priority, c.status, c.reported_by AS reportedBy,
  f.name AS facilityName, f.facility_code AS facilityCode, c.created_at AS createdAt, c.updated_at AS updatedAt`;

export async function getComplaints(search?: string, priority?: string, status?: string, facilityId?: number): Promise<Complaint[]> {
  const conditions: string[] = [];
  const values: (string | number)[] = [];
  if (search) {
    conditions.push('(c.title LIKE ? OR c.description LIKE ? OR f.name LIKE ?)');
    const term = `%${search}%`;
    values.push(term, term, term);
  }
  if (priority) { conditions.push('c.priority = ?'); values.push(priority); }
  if (status) { conditions.push('c.status = ?'); values.push(status); }
  if (facilityId) { conditions.push('c.facility_id = ?'); values.push(facilityId); }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const [rows] = await pool.query<ComplaintRow[]>(
    `SELECT ${columns} FROM complaints c JOIN facilities f ON f.id = c.facility_id ${where}
     ORDER BY FIELD(c.priority, 'Critical', 'High', 'Medium', 'Low'), c.created_at DESC`, values
  );
  return rows;
}

export async function getComplaintById(id: number): Promise<Complaint> {
  const [rows] = await pool.query<ComplaintRow[]>(
    `SELECT ${columns} FROM complaints c JOIN facilities f ON f.id = c.facility_id WHERE c.id = ?`, [id]
  );
  if (!rows[0]) throw new HttpError(404, 'Complaint not found.');
  return rows[0];
}

export async function createComplaint(input: ComplaintInput): Promise<Complaint> {
  await getFacilityById(input.facilityId);
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO complaints (facility_id, title, description, complaint_type, priority, status, reported_by)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [input.facilityId, input.title.trim(), input.description.trim(), input.complaintType, input.priority, input.status, input.reportedBy.trim()]
  );
  return getComplaintById(result.insertId);
}

export async function updateComplaint(id: number, input: ComplaintInput): Promise<Complaint> {
  await getComplaintById(id);
  await getFacilityById(input.facilityId);
  await pool.execute(
    `UPDATE complaints SET facility_id = ?, title = ?, description = ?, complaint_type = ?, priority = ?, status = ?, reported_by = ?
     WHERE id = ?`,
    [input.facilityId, input.title.trim(), input.description.trim(), input.complaintType, input.priority, input.status, input.reportedBy.trim(), id]
  );
  return getComplaintById(id);
}

export async function deleteComplaint(id: number): Promise<void> {
  const [result] = await pool.execute<ResultSetHeader>('DELETE FROM complaints WHERE id = ?', [id]);
  if (result.affectedRows === 0) throw new HttpError(404, 'Complaint not found.');
}