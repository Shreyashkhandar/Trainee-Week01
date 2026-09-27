import { Router } from 'express';
import { createComplaintRecord, deleteComplaintRecord, getComplaint, listComplaints, updateComplaintRecord } from '../controllers/complaintController.js';

export const complaintRoutes = Router();
complaintRoutes.get('/', listComplaints);
complaintRoutes.get('/:id', getComplaint);
complaintRoutes.post('/', createComplaintRecord);
complaintRoutes.put('/:id', updateComplaintRecord);
complaintRoutes.delete('/:id', deleteComplaintRecord);