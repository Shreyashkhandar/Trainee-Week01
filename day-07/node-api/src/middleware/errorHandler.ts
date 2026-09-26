import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error);
  const statusCode = typeof error.statusCode === 'number' ? error.statusCode : 500;
  const message = statusCode === 500 ? 'An unexpected server error occurred.' : error.message;
  response.status(statusCode).json({ success: false, message });
};
