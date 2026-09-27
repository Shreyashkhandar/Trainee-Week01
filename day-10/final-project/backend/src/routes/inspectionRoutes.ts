import { Router } from 'express';
import { createInspectionRecord, deleteInspectionRecord, getInspection, listInspections, listFacilityInspections, updateInspectionRecord } from '../controllers/inspectionController.js';

export const inspectionRoutes = Router();
export const facilityInspectionRoutes = Router({ mergeParams: true });
inspectionRoutes.get('/', listInspections);
inspectionRoutes.get('/:id', getInspection);
inspectionRoutes.post('/', createInspectionRecord);
inspectionRoutes.put('/:id', updateInspectionRecord);
inspectionRoutes.delete('/:id', deleteInspectionRecord);
facilityInspectionRoutes.get('/', listFacilityInspections);