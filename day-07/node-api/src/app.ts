import cors from 'cors';
import express from 'express';
import { employeeRoutes } from './routes/employeeRoutes.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requireDemoToken } from './middleware/auth.js';

export const app = express();
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: clientOrigin }));
app.use(express.json());
app.use(requestLogger);
app.get('/api/health', (_request, response) => response.json({ success: true, message: 'Employee API is running.' }));
app.use('/api/employees', employeeRoutes);
app.get('/api/profile', requireDemoToken, (_request, response) => response.json({ success: true, data: { message: 'Protected demo route reached.' } }));
app.use(errorHandler);
