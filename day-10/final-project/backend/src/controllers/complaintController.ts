import type { RequestHandler } from 'express';
import { complaintPriorities, complaintStatuses } from '../models/complaint.js';
import { createComplaint, deleteComplaint, getComplaintById, getComplaints, updateComplaint } from '../services/complaintService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { HttpError } from '../utils/httpError.js';
import { assertComplaintInput, parseId } from '../utils/validation.js';

export const listComplaints: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  const priority = typeof request.query.priority === 'string' ? request.query.priority : undefined;
  const status = typeof request.query.status === 'string' ? request.query.status : undefined;
  if (priority && !complaintPriorities.includes(priority as (typeof complaintPriorities)[number])) {
    throw new HttpError(400, 'Complaint priority filter is invalid.');
  }
  if (status && !complaintStatuses.includes(status as (typeof complaintStatuses)[number])) {
    throw new HttpError(400, 'Complaint status filter is invalid.');
  }
  const facilityId = typeof request.query.facilityId === 'string' ? parseId(request.query.facilityId) : undefined;
  const search = typeof request.query.search === 'string' ? request.query.search.trim() : undefined;
  response.json({ success: true, data: await getComplaints(search, priority, status, facilityId) });
});

export const getComplaint: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  response.json({ success: true, data: await getComplaintById(parseId(request.params.id)) });
});

export const createComplaintRecord: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  const input: unknown = request.body;
  assertComplaintInput(input);
  response.status(201).json({ success: true, data: await createComplaint(input) });
});

export const updateComplaintRecord: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  const input: unknown = request.body;
  assertComplaintInput(input);
  response.json({ success: true, data: await updateComplaint(parseId(request.params.id), input) });
});

export const deleteComplaintRecord: RequestHandler = asyncHandler(async (request, response): Promise<void> => {
  await deleteComplaint(parseId(request.params.id));
  response.json({ success: true, message: 'Complaint was deleted.' });
});