import type { RequestHandler } from 'express';
import { getDashboardMetrics } from '../services/dashboardService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getMetrics: RequestHandler = asyncHandler(async (_request, response): Promise<void> => {
  response.json({ success: true, data: await getDashboardMetrics() });
});