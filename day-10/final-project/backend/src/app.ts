import cors from 'cors';
import express from 'express';
import { complaintRoutes } from './routes/complaintRoutes.js';
import { facilityInspectionRoutes, inspectionRoutes } from './routes/inspectionRoutes.js';
import { facilityRoutes } from './routes/facilityRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { getMetrics } from './controllers/dashboardController.js';
import { pool } from './config/database.js';
import { asyncHandler } from './utils/asyncHandler.js';
import { HttpError } from './utils/httpError.js';

export const app = express();
const allowedOrigins = new Set([
  'http://localhost:3000',
  'http://localhost:4200',
  'http://localhost:3001',
  'http://localhost:4201',
  ...(process.env.CLIENT_ORIGINS || '').split(',').map((origin) => origin.trim()).filter(Boolean)
]);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) callback(null, true);
    else callback(new HttpError(403, 'This application origin is not allowed.'));
  }
}));
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', asyncHandler(async (_request, response): Promise<void> => {
  await pool.query('SELECT 1');
  response.json({ success: true, data: { status: 'ok', database: 'connected' } });
}));
app.get('/api/dashboard/metrics', getMetrics);
app.use('/api/facilities', facilityRoutes);
app.use('/api/facilities/:facilityId/inspections', facilityInspectionRoutes);
app.use('/api/inspections', inspectionRoutes);
app.use('/api/complaints', complaintRoutes);
app.use((_request, _response, next) => next(new HttpError(404, 'API endpoint not found.')));
app.use(errorHandler);