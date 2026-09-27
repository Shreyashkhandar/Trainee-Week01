import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { FacilityService } from './facility.service';
import { Facility } from './models';
import { MetricCardComponent } from './metric-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MetricCardComponent],
  template: `
    <section class="page-shell">
      <header class="topbar">
        <div>
          <p class="eyebrow">Operations Overview</p>
          <h1>Facility Inspection Dashboard</h1>
        </div>
      </header>

      <div *ngIf="loading" class="state-card">
        <p>Loading dashboard data...</p>
      </div>

      <div *ngIf="error" class="state-card error-card">
        <p>{{ error }}</p>
        <button class="secondary-btn" type="button" (click)="loadDashboard()">Try again</button>
      </div>

      <ng-container *ngIf="!loading && !error">
        <div class="metrics-grid">
          <app-metric-card label="Total Facilities" [value]="metrics.totalFacilities" />
          <app-metric-card label="Inspected Facilities" [value]="metrics.inspectedFacilities" variant="green" />
          <app-metric-card label="Pending Inspections" [value]="metrics.pendingInspections" variant="gold" />
          <app-metric-card label="Average Cleanliness" [value]="metrics.averageCleanlinessScore" suffix="%" variant="terracotta" />
        </div>

        <div class="toolbar">
          <div class="search-box">
            <label for="search">Search facilities</label>
            <input id="search" type="text" [(ngModel)]="searchTerm" placeholder="Search by facility, location or manager" />
          </div>

          <div class="filter-box">
            <label for="statusFilter">Filter by status</label>
            <select id="statusFilter" [(ngModel)]="statusFilter">
              <option value="all">All</option>
              <option value="Operational">Operational</option>
              <option value="Needs Review">Needs Review</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div class="filter-box">
            <label for="typeFilter">Filter by type</label>
            <select id="typeFilter" [(ngModel)]="typeFilter">
              <option value="all">All types</option>
              <option *ngFor="let type of facilityTypes" [value]="type">{{ type }}</option>
            </select>
          </div>

          <div class="filter-box">
            <label for="sortBy">Sort by</label>
            <select id="sortBy" [(ngModel)]="sortBy">
              <option value="name">Name</option>
              <option value="cleanliness">Cleanliness</option>
              <option value="complaints">Complaints</option>
            </select>
          </div>
        </div>

        <div class="facility-list" *ngIf="filteredFacilities.length; else emptyState">
          <article class="facility-card" *ngFor="let facility of filteredFacilities">
            <div class="facility-header">
              <div>
                <p class="facility-type">{{ facility.type }}</p>
                <h2>{{ facility.name }}</h2>
              </div>
              <span class="status-badge" [ngClass]="facility.status.toLowerCase().replace(' ', '-')">
                {{ facility.status }}
              </span>
            </div>

            <div class="facility-meta">
              <span>{{ facility.location }}</span>
              <span>{{ facility.region }} Region</span>
              <span>Manager: {{ facility.manager }}</span>
            </div>

            <div class="score-row">
              <div>
                <small>Cleanliness</small>
                <strong>{{ facility.cleanlinessScore }}%</strong>
              </div>
              <div>
                <small>Complaints</small>
                <strong>{{ facility.complaints }}</strong>
              </div>
              <div>
                <small>Risk</small>
                <strong>{{ facility.riskLevel }}</strong>
              </div>
            </div>

            <div class="card-actions">
              <a [routerLink]="['/facilities', facility.id]" class="secondary-btn">View details</a>
            </div>
          </article>
        </div>

        <ng-template #emptyState>
          <div class="state-card">
            <p>No facilities match the current search or filter.</p>
          </div>
        </ng-template>
      </ng-container>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 24px;
        font-family: 'Segoe UI', sans-serif;
      }
      .page-shell {
        max-width: 1200px;
        margin: 0 auto;
      }
      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        gap: 16px;
      }
      .eyebrow {
        margin: 0 0 8px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #5b6b8a;
        font-size: 12px;
        font-weight: 700;
      }
      h1 {
        margin: 0;
        font-size: 2rem;
        color: #10233d;
      }
      .secondary-btn {
        border: none;
        border-radius: 4px;
        padding: 10px 18px;
        font-weight: 600;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .secondary-btn {
        background: #ebf3ff;
        color: #0d47a1;
      }
      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }
      .toolbar {
        display: grid;
        grid-template-columns: 2fr repeat(3, minmax(120px, 1fr));
        gap: 16px;
        background: #ffffff;
        border: 1px solid #e5ebf5;
        border-radius: 4px;
        padding: 16px;
        margin-bottom: 24px;
      }
      .search-box, .filter-box {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      label {
        font-weight: 600;
        color: #23415f;
      }
      input, select {
        width: 100%;
        border: 1px solid #dbe4f0;
        border-radius: 4px;
        padding: 10px 12px;
        font-size: 1rem;
        background: #fff;
      }
      .facility-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 18px;
      }
      .facility-card {
        background: white;
        border: 1px solid #e5edf9;
        border-radius: 6px;
        padding: 18px;
        box-shadow: 0 10px 25px rgba(16, 35, 61, 0.06);
      }
      .facility-header {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: flex-start;
      }
      .facility-type {
        margin: 0 0 6px;
        font-size: 0.72rem;
        text-transform: uppercase;
        color: #55739b;
        letter-spacing: 0.08em;
      }
      h2 {
        margin: 0;
        font-size: 1.35rem;
        color: #11233d;
      }
      .status-badge {
        border-radius: 999px;
        padding: 8px 12px;
        font-size: 0.75rem;
        font-weight: 700;
        white-space: nowrap;
      }
      .status-badge.operational { background: #eafaf1; color: #1c8f53; }
      .status-badge.needs-review { background: #fff5db; color: #af7c00; }
      .status-badge.critical { background: #ffe6e6; color: #c53131; }
      .facility-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 14px;
        color: #59708c;
        margin: 16px 0;
        font-size: 0.92rem;
      }
      .score-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        border-top: 1px solid #edf2f9;
        border-bottom: 1px solid #edf2f9;
        padding: 12px 0;
        margin-bottom: 16px;
      }
      .score-row small {
        display: block;
        color: #68809d;
        margin-bottom: 4px;
      }
      .score-row strong {
        font-size: 1.1rem;
        color: #183250;
      }
      .card-actions {
        display: flex;
        justify-content: flex-end;
      }
      .state-card {
        background: #f8fbff;
        border: 1px solid #dfeaf8;
        border-radius: 4px;
        padding: 18px;
        color: #19314f;
        margin-bottom: 20px;
      }
      .error-card {
        border-color: #f3c8c8;
        background: #fff5f5;
        color: #9b1c1c;
      }
      @media (max-width: 760px) {
        .toolbar {
          grid-template-columns: 1fr;
        }
        .topbar {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `
  ]
})
export class DashboardComponent implements OnInit {
  metrics = { totalFacilities: 0, inspectedFacilities: 0, pendingInspections: 0, averageCleanlinessScore: 0 };
  facilities: Facility[] = [];
  searchTerm = '';
  statusFilter = 'all';
  typeFilter = 'all';
  sortBy = 'name';
  loading = true;
  error = '';

  constructor(private facilityService: FacilityService) {}

  get facilityTypes(): string[] {
    return [...new Set(this.facilities.map((facility) => facility.type))].sort();
  }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.error = '';
    forkJoin({
      metrics: this.facilityService.getDashboardMetrics(),
      facilities: this.facilityService.getFacilities()
    }).pipe(finalize(() => this.loading = false)).subscribe({
      next: ({ metrics, facilities }) => {
        this.metrics = metrics;
        this.facilities = facilities;
      },
      error: () => {
        this.error = 'The inspection API could not be reached. Start the local API and try again.';
      }
    });
  }

  get filteredFacilities(): Facility[] {
    const searchValue = this.searchTerm.trim().toLowerCase();

    const filtered = this.facilities.filter((facility) => {
      const matchesSearch = !searchValue || [facility.name, facility.location, facility.manager].join(' ').toLowerCase().includes(searchValue);
      const matchesStatus = this.statusFilter === 'all' || facility.status === this.statusFilter;
      const matchesType = this.typeFilter === 'all' || facility.type === this.typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });

    filtered.sort((a, b) => {
      if (this.sortBy === 'cleanliness') {
        return b.cleanlinessScore - a.cleanlinessScore;
      }
      if (this.sortBy === 'complaints') {
        return a.complaints - b.complaints;
      }
      return a.name.localeCompare(b.name);
    });

    return filtered;
  }
}
