import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

interface DashboardMetrics {
  totalFacilities: number;
  activeFacilities: number;
  pendingInspections: number;
  completedInspections: number;
  openComplaints: number;
  criticalComplaints: number;
  averageCleanlinessScore: number;
}

interface Facility {
  id: number;
  name: string;
  facilityCode: string;
  location: string;
  facilityType: string;
  status: string;
  cleanlinessScore: number;
  lastInspectionDate: string | null;
}

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <header class="topbar">
        <h1>Facility Inspection Summary</h1>
        <span>Live backend</span>
      </header>

      <div *ngIf="loading" class="loading">Loading metrics...</div>
      <div *ngIf="error" class="error">{{ error }}</div>

      <div *ngIf="!loading && metrics" class="metric-grid">
        <div class="metric-card">
          <h3>Total Facilities</h3>
          <div class="metric-value">{{ metrics.totalFacilities }}</div>
        </div>
        <div class="metric-card">
          <h3>Active Facilities</h3>
          <div class="metric-value">{{ metrics.activeFacilities }}</div>
        </div>
        <div class="metric-card">
          <h3>Open Complaints</h3>
          <div class="metric-value">{{ metrics.openComplaints }}</div>
        </div>
        <div class="metric-card">
          <h3>Average Cleanliness</h3>
          <div class="metric-value">{{ metrics.averageCleanlinessScore }}%</div>
        </div>
      </div>

      <section class="panel" *ngIf="!loading">
        <h2>Facilities</h2>
        <div class="facility-list">
          <div class="facility-card" *ngFor="let facility of facilities">
            <h3>{{ facility.name }}</h3>
            <p>{{ facility.facilityCode }} • {{ facility.location }}</p>
            <p>{{ facility.facilityType }}</p>
            <span class="status">{{ facility.status }}</span>
            <p>Cleanliness: {{ facility.cleanlinessScore }}%</p>
          </div>
        </div>
      </section>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements OnInit {
  metrics?: DashboardMetrics;
  facilities: Facility[] = [];
  loading = true;
  error = '';

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ success: boolean; data: DashboardMetrics }>('http://localhost:5001/api/dashboard/metrics')
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.metrics = response.data;
          this.loadFacilities();
        },
        error: () => {
          this.error = 'Unable to load dashboard metrics from the API.';
        }
      });
  }

  private loadFacilities(): void {
    this.http.get<{ success: boolean; data: Facility[] }>('http://localhost:5001/api/facilities')
      .subscribe({
        next: (response) => {
          this.facilities = response.data.slice(0, 6);
        },
        error: () => {
          this.error = 'Unable to load facility data from the API.';
        }
      });
  }
}
