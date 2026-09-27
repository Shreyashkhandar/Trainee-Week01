import { complaintPriorities, complaintStatuses, complaintTypes, type ComplaintInput } from '../models/complaint.js';
import { facilityStatuses, facilityTypes, type FacilityInput } from '../models/facility.js';
import { inspectionStatuses, wasteLevels, type InspectionInput } from '../models/inspection.js';
import { HttpError } from './httpError.js';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isScore(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100;
}

function isDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime())
    && parsed.toISOString().slice(0, 10) === value
    && value <= new Date().toISOString().slice(0, 10);
}

export function parseId(value: unknown): number {
  if (typeof value !== 'string' || !/^\d+$/.test(value)) {
    throw new HttpError(400, 'Resource ID must be a positive integer.');
  }
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id < 1) throw new HttpError(400, 'Resource ID must be a positive integer.');
  return id;
}

export function assertFacilityInput(value: unknown): asserts value is FacilityInput {
  if (!isRecord(value)
    || !isNonEmptyString(value.name)
    || !isNonEmptyString(value.facilityCode)
    || !isNonEmptyString(value.location)
    || !facilityTypes.includes(value.facilityType as FacilityInput['facilityType'])
    || !facilityStatuses.includes(value.status as FacilityInput['status'])
    || !isScore(value.cleanlinessScore)) {
    throw new HttpError(400, 'Provide a name, facility code, location, valid type and status, and cleanliness score from 0 to 100.');
  }
}

export function assertInspectionInput(value: unknown): asserts value is InspectionInput {
  if (!isRecord(value)
    || !Number.isSafeInteger(value.facilityId)
    || Number(value.facilityId) < 1
    || !isNonEmptyString(value.inspectorName)
    || !isDate(value.inspectionDate)
    || !isScore(value.cleanlinessScore)
    || !isScore(value.odorScore)
    || !wasteLevels.includes(value.wasteLevel as InspectionInput['wasteLevel'])
    || typeof value.waterAvailability !== 'boolean'
    || typeof value.remarks !== 'string'
    || !inspectionStatuses.includes(value.status as InspectionInput['status'])) {
    throw new HttpError(400, 'Provide a valid facility, date, inspector, scores, waste level, water availability, remarks, and inspection status.');
  }
}

export function assertComplaintInput(value: unknown): asserts value is ComplaintInput {
  if (!isRecord(value)
    || !Number.isSafeInteger(value.facilityId)
    || Number(value.facilityId) < 1
    || !isNonEmptyString(value.title)
    || !isNonEmptyString(value.description)
    || !complaintTypes.includes(value.complaintType as ComplaintInput['complaintType'])
    || !complaintPriorities.includes(value.priority as ComplaintInput['priority'])
    || !complaintStatuses.includes(value.status as ComplaintInput['status'])
    || !isNonEmptyString(value.reportedBy)) {
    throw new HttpError(400, 'Provide a valid facility, title, description, complaint type, priority, status, and reporter.');
  }
}