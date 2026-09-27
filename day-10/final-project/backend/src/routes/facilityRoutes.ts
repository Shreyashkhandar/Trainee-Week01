import { Router } from 'express';
import { createFacilityRecord, deleteFacilityRecord, getFacility, listFacilities, updateFacilityRecord } from '../controllers/facilityController.js';

export const facilityRoutes = Router();
facilityRoutes.get('/', listFacilities);
facilityRoutes.get('/:id', getFacility);
facilityRoutes.post('/', createFacilityRecord);
facilityRoutes.put('/:id', updateFacilityRecord);
facilityRoutes.delete('/:id', deleteFacilityRecord);