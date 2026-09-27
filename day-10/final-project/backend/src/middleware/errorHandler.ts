import type { ErrorRequestHandler } from 'express';
import { HttpError } from '../utils/httpError.js';

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  if (error instanceof HttpError) {
    response.status(error.statusCode).json({ success: false, message: error.message });
    return;
  }

  if (error instanceof SyntaxError && 'status' in error && error.status === 400) {
    response.status(400).json({ success: false, message: 'Request body must be valid JSON.' });
    return;
  }

  response.status(500).json({ success: false, message: 'Unexpected server error.' });
};