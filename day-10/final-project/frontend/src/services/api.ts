import type {
  Complaint,
  ComplaintInput,
  ComplaintPriority,
  ComplaintStatus,
  DashboardMetrics,
  Facility,
  FacilityInput,
  FacilityStatus,
  FacilityType,
  Inspection,
  InspectionInput,
  InspectionStatus
} from '@/types/domain';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
      cache: 'no-store'
    });
  } catch {
    throw new ApiError('The API could not be reached. Check that the backend is running.', 0);
  }

  let payload: ApiResponse<T>;
  try {
    payload = await response.json() as ApiResponse<T>;
  } catch {
    throw new ApiError('The API returned an unreadable response.', response.status);
  }
  if (!response.ok || !payload.success) {
    throw new ApiError(payload.message || 'The request could not be completed.', response.status);
  }
  return payload.data as T;
}

function queryString(values: Record<string, string | undefined>): string {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  const query = params.toString();
  return query ? `?${query}` : '';
}

export const api = {
  getMetrics: () => request<DashboardMetrics>('/dashboard/metrics'),
  getFacilities: (filters: { search?: string; status?: FacilityStatus | ''; type?: FacilityType | ''; sort?: string } = {}) =>
    request<Facility[]>(`/facilities${queryString(filters)}`),
  getFacility: (id: number) => request<Facility>(`/facilities/${id}`),
  createFacility: (input: FacilityInput) => request<Facility>('/facilities', { method: 'POST', body: JSON.stringify(input) }),
  updateFacility: (id: number, input: FacilityInput) => request<Facility>(`/facilities/${id}`, { method: 'PUT', body: JSON.stringify(input) }),
  deleteFacility: (id: number) => request<undefined>(`/facilities/${id}`, { method: 'DELETE' }),
  getInspections: (filters: { facilityId?: number; status?: InspectionStatus | '' } = {}) =>
    request<Inspection[]>(`/inspections${queryString({ facilityId: filters.facilityId?.toString(), status: filters.status })}`),
  getFacilityInspections: (facilityId: number) => request<Inspection[]>(`/facilities/${facilityId}/inspections`),
  createInspection: (input: InspectionInput) => request<Inspection>('/inspections', { method: 'POST', body: JSON.stringify(input) }),
  updateInspection: (id: number, input: InspectionInput) => request<Inspection>(`/inspections/${id}`, { method: 'PUT', body: JSON.stringify(input) }),
  deleteInspection: (id: number) => request<undefined>(`/inspections/${id}`, { method: 'DELETE' }),
  getComplaints: (filters: { search?: string; priority?: ComplaintPriority | ''; status?: ComplaintStatus | ''; facilityId?: number } = {}) =>
    request<Complaint[]>(`/complaints${queryString({ ...filters, facilityId: filters.facilityId?.toString() })}`),
  createComplaint: (input: ComplaintInput) => request<Complaint>('/complaints', { method: 'POST', body: JSON.stringify(input) }),
  updateComplaint: (id: number, input: ComplaintInput) => request<Complaint>(`/complaints/${id}`, { method: 'PUT', body: JSON.stringify(input) }),
  deleteComplaint: (id: number) => request<undefined>(`/complaints/${id}`, { method: 'DELETE' })
};