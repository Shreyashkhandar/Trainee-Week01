import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardMetrics, Facility, Inspection, InspectionSubmission } from './models';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getDashboardMetrics(): Observable<DashboardMetrics> {
    return this.http.get<DashboardMetrics>(`${this.apiUrl}/dashboard`);
  }

  getFacilities(): Observable<Facility[]> {
    return this.http.get<Facility[]>(`${this.apiUrl}/facilities`);
  }

  getFacility(id: number): Observable<Facility> {
    return this.http.get<Facility>(`${this.apiUrl}/facilities/${id}`);
  }

  getFacilityInspections(facilityId: number): Observable<Inspection[]> {
    return this.http.get<Inspection[]>(`${this.apiUrl}/facilities/${facilityId}/inspections`);
  }

  createInspection(payload: InspectionSubmission): Observable<Inspection> {
    return this.http.post<Inspection>(`${this.apiUrl}/inspections`, payload);
  }
}
