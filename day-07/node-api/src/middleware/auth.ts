import type { RequestHandler } from 'express';

export const requireDemoToken: RequestHandler = (request, response, next) => {
  const expectedToken = process.env.DEMO_TOKEN || 'day7-training-token';
  if (request.header('Authorization') !== `Bearer ${expectedToken}`) {
    response.status(401).json({ success: false, message: 'A valid demo token is required.' });
    return;
  }
  next();
};
