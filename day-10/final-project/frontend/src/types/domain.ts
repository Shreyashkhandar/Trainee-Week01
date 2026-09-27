export type FacilityType = 'Clinic' | 'Warehouse' | 'Training Center' | 'Laboratory' | 'Office' | 'Community Center';
export type FacilityStatus = 'Active' | 'Under Maintenance' | 'Inactive';
export type WasteLevel = 'Low' | 'Moderate' | 'High';
export type InspectionStatus = 'Pending' | 'Completed' | 'Needs Follow-up';
export type ComplaintType = 'Cleanliness' | 'Safety' | 'Maintenance' | 'Supplies' | 'Other';
export type ComplaintPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type ComplaintStatus = 'Open' | 'In Progress' | 'Resolved';

export interface Facility {
  id: number;
  name: string;
  facilityCode: string;
  location: string;
  facilityType: FacilityType;
  status: FacilityStatus;
  cleanlinessScore: number;
  lastInspectionDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export type FacilityInput = Pick<Facility,
  'name' | 'facilityCode' | 'location' | 'facilityType' | 'status' | 'cleanlinessScore'>;

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

export type InspectionInput = Omit<Inspection, 'id' | 'facilityName' | 'facilityCode' | 'createdAt' | 'updatedAt'>;

export interface Complaint {
  id: number;
  facilityId: number;
  title: string;
  description: string;
  complaintType: ComplaintType;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  reportedBy: string;
  facilityName?: string;
  facilityCode?: string;
  createdAt: string;
  updatedAt: string;
}

export type ComplaintInput = Omit<Complaint, 'id' | 'facilityName' | 'facilityCode' | 'createdAt' | 'updatedAt'>;

export interface DashboardMetrics {
  totalFacilities: number;
  activeFacilities: number;
  pendingInspections: number;
  completedInspections: number;
  openComplaints: number;
  criticalComplaints: number;
  averageCleanlinessScore: number;
}