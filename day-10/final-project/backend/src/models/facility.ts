export const facilityTypes = ['Clinic', 'Warehouse', 'Training Center', 'Laboratory', 'Office', 'Community Center'] as const;
export type FacilityType = (typeof facilityTypes)[number];

export const facilityStatuses = ['Active', 'Under Maintenance', 'Inactive'] as const;
export type FacilityStatus = (typeof facilityStatuses)[number];

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

export type FacilityInput = Omit<Facility, 'id' | 'lastInspectionDate' | 'createdAt' | 'updatedAt'>;

export interface FacilityFilters {
  search?: string;
  status?: FacilityStatus;
  type?: FacilityType;
  sort?: 'name' | 'score' | 'inspectionDate';
}