export const wasteLevels = ['Low', 'Moderate', 'High'] as const;
export type WasteLevel = (typeof wasteLevels)[number];

export const inspectionStatuses = ['Pending', 'Completed', 'Needs Follow-up'] as const;
export type InspectionStatus = (typeof inspectionStatuses)[number];

export interface Inspection {
  id: number;
  facilityId: number;
  inspectorName: string;
  inspectionDate: string;
  cleanlinessScore: number;
  odorScore: number;
  wasteLevel: WasteLevel;
  waterAvailability: boolean;
  remarks: string;
  status: InspectionStatus;
  facilityName?: string;
  facilityCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InspectionInput {
  facilityId: number;
  inspectorName: string;
  inspectionDate: string;
  cleanlinessScore: number;
  odorScore: number;
  wasteLevel: WasteLevel;
  waterAvailability: boolean;
  remarks: string;
  status: InspectionStatus;
}