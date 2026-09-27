export const complaintTypes = ['Cleanliness', 'Safety', 'Maintenance', 'Supplies', 'Other'] as const;
export type ComplaintType = (typeof complaintTypes)[number];

export const complaintPriorities = ['Low', 'Medium', 'High', 'Critical'] as const;
export type ComplaintPriority = (typeof complaintPriorities)[number];

export const complaintStatuses = ['Open', 'In Progress', 'Resolved'] as const;
export type ComplaintStatus = (typeof complaintStatuses)[number];

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