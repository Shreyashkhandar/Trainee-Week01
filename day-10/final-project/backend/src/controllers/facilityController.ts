import type { RequestHandler } from 'express';
import { facilityStatuses, facilityTypes, type FacilityFilters } from '../models/facility.js';
import { createFacility, deleteFacility, getFacilities, getFacilityById, updateFacility } from '../services/facilityService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { HttpError } from '../utils/httpError.js';
import { assertFacilityInput, parseId } from '../utils/validation.js';

export const listFacilities: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  const filters: FacilityFilters = {};
  if (typeof request.query.search === 'string') filters.search = request.query.search.trim();
  if (typeof request.query.status === 'string') {
    if (!facilityStatuses.includes(request.query.status as NonNullable<FacilityFilters['status']>)) throw new HttpError(400, 'Facility status filter is invalid.');
    filters.status = request.query.status as NonNullable<FacilityFilters['status']>;
  }
  if (typeof request.query.type === 'string') {
    if (!facilityTypes.includes(request.query.type as NonNullable<FacilityFilters['type']>)) throw new HttpError(400, 'Facility type filter is invalid.');
    filters.type = request.query.type as NonNullable<FacilityFilters['type']>;
  }
  if (typeof request.query.sort === 'string') {
    if (!['name', 'score', 'inspectionDate'].includes(request.query.sort)) throw new HttpError(400, 'Facility sort option is invalid.');
    filters.sort = request.query.sort as NonNullable<FacilityFilters['sort']>;
  }
  response.json({ success: true, data: await getFacilities(filters) });
});

export const getFacility: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  response.json({ success: true, data: await getFacilityById(parseId(request.params.id)) });
});

export const createFacilityRecord: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  const input: unknown = request.body;
  assertFacilityInput(input);
  response.status(201).json({ success: true, data: await createFacility(input) });
});

export const updateFacilityRecord: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  const input: unknown = request.body;
  assertFacilityInput(input);
  response.json({ success: true, data: await updateFacility(parseId(request.params.id), input) });
});

export const deleteFacilityRecord: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  await deleteFacility(parseId(request.params.id));
  response.json({ success: true, message: 'Facility and its related records were deleted.' });
});