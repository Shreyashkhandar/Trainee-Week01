export type FacilityStatus = 'Operational' | 'Needs Review' | 'Critical';

export type InspectionStatus = 'Pass' | 'Warning' | 'Critical';

export type WasteLevel = 'Low' | 'Moderate' | 'High';

export interface Facility {
  id: number;
  name: string;
  type: string;
  status: FacilityStatus;
  location: string;
  region: string;
  manager: string;
  cleanlinessScore: number;
  complaints: number;
  riskLevel: string;
  lastInspectionDate: string | null;
  description: string;
}

export interface Inspection {
  id: number;
  facilityId: number;
  inspectionDate: string;
  inspector: string;
  cleanlinessScore: number;
  odorScore: number;
  wasteLevel: WasteLevel;
  remarks: string;
  status: InspectionStatus;
}

export interface DashboardMetrics {
  totalFacilities: number;
  inspectedFacilities: number;
  pendingInspections: number;
  averageCleanlinessScore: number;
}

export interface InspectionSubmission {
  facilityId: number;
  inspectionDate: string;
  inspector: string;
  cleanlinessScore: number;
  odorScore: number;
  wasteLevel: WasteLevel;
  remarks: string;
  status: InspectionStatus;
}
