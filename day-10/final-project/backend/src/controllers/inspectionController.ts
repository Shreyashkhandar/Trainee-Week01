import type { RequestHandler } from 'express';
import { inspectionStatuses } from '../models/inspection.js';
import { createInspection, deleteInspection, getInspections, updateInspection } from '../services/inspectionService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { HttpError } from '../utils/httpError.js';
import { assertInspectionInput, parseId } from '../utils/validation.js';

export const listInspections: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  const facilityId = typeof request.query.facilityId === 'string' ? parseId(request.query.facilityId) : undefined;
  const status = typeof request.query.status === 'string' ? request.query.status : undefined;
  if (status && !inspectionStatuses.includes(status as (typeof inspectionStatuses)[number])) {
    throw new HttpError(400, 'Inspection status filter is invalid.');
  }
  response.json({ success: true, data: await getInspections(facilityId, status) });
});

export const listFacilityInspections: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  const facilityId = parseId(request.params.facilityId);
  response.json({ success: true, data: await getInspections(facilityId) });
});

export const getInspection: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  const inspections = await getInspections();
  const inspection = inspections.find((item) => item.id === parseId(request.params.id));
  if (!inspection) throw new HttpError(404, 'Inspection not found.');
  response.json({ success: true, data: inspection });
});

export const createInspectionRecord: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  const input: unknown = request.body;
  assertInspectionInput(input);
  response.status(201).json({ success: true, data: await createInspection(input) });
});

export const updateInspectionRecord: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  const input: unknown = request.body;
  assertInspectionInput(input);
  response.json({ success: true, data: await updateInspection(parseId(request.params.id), input) });
});

export const deleteInspectionRecord: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  await deleteInspection(parseId(request.params.id));
  response.json({ success: true, message: 'Inspection was deleted.' });
});