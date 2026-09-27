import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import type { PoolConnection } from 'mysql2/promise';
import { pool } from '../config/database.js';
import type { Inspection, InspectionInput } from '../models/inspection.js';
import { HttpError } from '../utils/httpError.js';
import { getFacilityById } from './facilityService.js';

type InspectionRow = RowDataPacket & Inspection;

const columns = `i.id, i.facility_id AS facilityId, i.inspector_name AS inspectorName,
  i.inspection_date AS inspectionDate, i.cleanliness_score AS cleanlinessScore,
  i.odor_score AS odorScore, i.waste_level AS wasteLevel,
  i.water_availability AS waterAvailability, i.remarks, i.status,
  f.name AS facilityName, f.facility_code AS facilityCode,
  i.created_at AS createdAt, i.updated_at AS updatedAt`;

async function getInspectionById(id: number): Promise<Inspection> {
  const [rows] = await pool.query<InspectionRow[]>(
    `SELECT ${columns} FROM inspections i JOIN facilities f ON f.id = i.facility_id WHERE i.id = ?`, [id]
  );
  if (!rows[0]) throw new HttpError(404, 'Inspection not found.');
  return rows[0];
}

async function syncFacilitySummary(facilityId: number, connection?: PoolConnection): Promise<void> {
  const database = connection ?? pool;
  const [rows] = await database.query<Array<RowDataPacket & { cleanlinessScore: number; inspectionDate: string }>>(
    `SELECT cleanliness_score AS cleanlinessScore, inspection_date AS inspectionDate
     FROM inspections WHERE facility_id = ? AND status <> 'Pending'
     ORDER BY inspection_date DESC, id DESC LIMIT 1`, [facilityId]
  );
  if (rows[0]) {
    await database.execute('UPDATE facilities SET cleanliness_score = ?, last_inspection_date = ? WHERE id = ?',
      [rows[0].cleanlinessScore, rows[0].inspectionDate, facilityId]);
  } else {
    await database.execute('UPDATE facilities SET cleanliness_score = 0, last_inspection_date = NULL WHERE id = ?', [facilityId]);
  }
}

export async function getInspections(facilityId?: number, status?: string): Promise<Inspection[]> {
  const conditions: string[] = [];
  const values: (string | number)[] = [];
  if (facilityId) {
    conditions.push('i.facility_id = ?');
    values.push(facilityId);
  }
  if (status) {
    conditions.push('i.status = ?');
    values.push(status);
  }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const [rows] = await pool.query<InspectionRow[]>(
    `SELECT ${columns} FROM inspections i JOIN facilities f ON f.id = i.facility_id ${where}
     ORDER BY i.inspection_date DESC, i.id DESC`, values
  );
  return rows;
}

export async function createInspection(input: InspectionInput): Promise<Inspection> {
  await getFacilityById(input.facilityId);
  const connection = await pool.getConnection();
  let inspectionId = 0;
  try {
    await connection.beginTransaction();
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO inspections (facility_id, inspector_name, inspection_date, cleanliness_score, odor_score,
        waste_level, water_availability, remarks, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [input.facilityId, input.inspectorName.trim(), input.inspectionDate, input.cleanlinessScore, input.odorScore,
        input.wasteLevel, input.waterAvailability, input.remarks.trim(), input.status]
    );
    inspectionId = result.insertId;
    await syncFacilitySummary(input.facilityId, connection);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  return getInspectionById(inspectionId);
}

export async function updateInspection(id: number, input: InspectionInput): Promise<Inspection> {
  const existing = await getInspectionById(id);
  await getFacilityById(input.facilityId);
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute(
      `UPDATE inspections SET facility_id = ?, inspector_name = ?, inspection_date = ?, cleanliness_score = ?,
        odor_score = ?, waste_level = ?, water_availability = ?, remarks = ?, status = ? WHERE id = ?`,
      [input.facilityId, input.inspectorName.trim(), input.inspectionDate, input.cleanlinessScore, input.odorScore,
        input.wasteLevel, input.waterAvailability, input.remarks.trim(), input.status, id]
    );
    await syncFacilitySummary(existing.facilityId, connection);
    if (input.facilityId !== existing.facilityId) await syncFacilitySummary(input.facilityId, connection);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  return getInspectionById(id);
}

export async function deleteInspection(id: number): Promise<void> {
  const existing = await getInspectionById(id);
  await pool.execute('DELETE FROM inspections WHERE id = ?', [id]);
  await syncFacilitySummary(existing.facilityId);
}