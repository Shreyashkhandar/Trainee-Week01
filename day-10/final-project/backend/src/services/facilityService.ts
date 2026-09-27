import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/database.js';
import type { Facility, FacilityFilters, FacilityInput } from '../models/facility.js';
import { HttpError } from '../utils/httpError.js';

type FacilityRow = RowDataPacket & Facility;

const columns = `id, name, facility_code AS facilityCode, location, facility_type AS facilityType,
  status, cleanliness_score AS cleanlinessScore, last_inspection_date AS lastInspectionDate,
  created_at AS createdAt, updated_at AS updatedAt`;

export async function getFacilities(filters: FacilityFilters = {}): Promise<Facility[]> {
  const conditions: string[] = [];
  const values: (string | number)[] = [];
  if (filters.search) {
    conditions.push('(name LIKE ? OR facility_code LIKE ? OR location LIKE ?)');
    const search = `%${filters.search}%`;
    values.push(search, search, search);
  }
  if (filters.status) {
    conditions.push('status = ?');
    values.push(filters.status);
  }
  if (filters.type) {
    conditions.push('facility_type = ?');
    values.push(filters.type);
  }

  const ordering = filters.sort === 'score'
    ? 'cleanliness_score DESC, name ASC'
    : filters.sort === 'inspectionDate'
      ? 'last_inspection_date IS NULL, last_inspection_date DESC, name ASC'
      : 'name ASC';
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const [rows] = await pool.query<FacilityRow[]>(`SELECT ${columns} FROM facilities ${where} ORDER BY ${ordering}`, values);
  return rows;
}

export async function getFacilityById(id: number): Promise<Facility> {
  const [rows] = await pool.query<FacilityRow[]>(`SELECT ${columns} FROM facilities WHERE id = ?`, [id]);
  if (!rows[0]) throw new HttpError(404, 'Facility not found.');
  return rows[0];
}

export async function createFacility(input: FacilityInput): Promise<Facility> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO facilities (name, facility_code, location, facility_type, status, cleanliness_score)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [input.name.trim(), input.facilityCode.trim(), input.location.trim(), input.facilityType, input.status, input.cleanlinessScore]
  );
  return getFacilityById(result.insertId);
}

export async function updateFacility(id: number, input: FacilityInput): Promise<Facility> {
  await getFacilityById(id);
  await pool.execute(
    `UPDATE facilities SET name = ?, facility_code = ?, location = ?, facility_type = ?, status = ?, cleanliness_score = ?
     WHERE id = ?`,
    [input.name.trim(), input.facilityCode.trim(), input.location.trim(), input.facilityType, input.status, input.cleanlinessScore, id]
  );
  return getFacilityById(id);
}

export async function deleteFacility(id: number): Promise<void> {
  const [result] = await pool.execute<ResultSetHeader>('DELETE FROM facilities WHERE id = ?', [id]);
  if (result.affectedRows === 0) throw new HttpError(404, 'Facility not found.');
}