import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { FacilityService } from './facility.service';
import { Facility, Inspection } from './models';
import { InspectionHistoryComponent } from './inspection-history.component';

@Component({
  selector: 'app-facility-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, InspectionHistoryComponent],
  template: `
    <section class="page-shell">
      <div *ngIf="loading" class="state-card">Loading facility details...</div>
      <div *ngIf="error" class="state-card error-card">{{ error }}</div>

      <ng-container *ngIf="facility && !loading">
        <header class="topbar">
          <div>
            <p class="eyebrow">Facility Profile</p>
            <h1>{{ facility.name }}</h1>
          </div>
          <a routerLink="/" class="secondary-btn">Back to Dashboard</a>
        </header>

        <div class="detail-grid">
          <article class="panel">
            <p class="section-label">Overview</p>
            <h2>{{ facility.type }}</h2>
            <p>{{ facility.description }}</p>

            <div class="meta-grid">
              <div><span>Status</span><strong>{{ facility.status }}</strong></div>
              <div><span>Region</span><strong>{{ facility.region }}</strong></div>
              <div><span>Location</span><strong>{{ facility.location }}</strong></div>
              <div><span>Manager</span><strong>{{ facility.manager }}</strong></div>
              <div><span>Risk</span><strong>{{ facility.riskLevel }}</strong></div>
              <div><span>Last Inspection</span><strong>{{ facility.lastInspectionDate || 'Not yet inspected' }}</strong></div>
            </div>
          </article>

          <aside class="panel score-panel">
            <p class="section-label">Inspection Health</p>
            <div class="score-big">{{ facility.cleanlinessScore }}%</div>
            <div class="score-details">
              <span>Cleanliness score</span>
              <span>{{ facility.complaints }} complaint reports</span>
            </div>
          </aside>
        </div>

        <div class="history-wrap">
          <div class="history-header">
            <h3>Inspection History</h3>
            <a [routerLink]="['/inspections/new']" [queryParams]="{ facilityId: facility.id }" class="primary-btn">Add Inspection</a>
          </div>

          <app-inspection-history [inspections]="inspections" />
        </div>
      </ng-container>
    </section>
  `,
  styles: [
    `
      :host { display: block; padding: 24px; }
      .page-shell { max-width: 1100px; margin: 0 auto; }
      .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
      .eyebrow { margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.08em; color: #546d8d; font-size: 12px; font-weight: 700; }
      h1 { margin: 0; font-size: 2rem; color: #10233d; }
      .primary-btn, .secondary-btn {
        border-radius: 4px; padding: 10px 16px; text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; justify-content: center;
      }
      .primary-btn { background: #1a73e8; color: white; }
      .secondary-btn { background: #ebf3ff; color: #0d47a1; }
      .detail-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
      .panel {
        background: white; border: 1px solid #e4ebf3; border-radius: 4px; box-shadow: 0 8px 18px rgba(16,35,61,.04); padding: 20px;
      }
      .section-label { color: #597090; text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px; font-weight: 700; }
      h2 { margin: 8px 0 12px; font-size: 1.6rem; color: #132c4f; }
      .meta-grid {
        display: grid; grid-template-columns: repeat(2, minmax(120px,1fr)); gap: 16px; margin-top: 20px;
      }
      .meta-grid div { background: #f7faff; border: 1px solid #e8f0fb; border-radius: 4px; padding: 12px; }
      .meta-grid span { display: block; color: #607894; font-size: 0.8rem; margin-bottom: 6px; }
      .meta-grid strong { color: #183250; }
      .score-panel { display: flex; flex-direction: column; justify-content: center; }
      .score-big { font-size: 4rem; font-weight: 800; color: #1958b3; }
      .score-details { display: flex; flex-direction: column; gap: 6px; color: #586f87; }
      .history-wrap { margin-top: 28px; }
      .history-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
      h3 { margin: 0; color: #1c2d49; font-size: 1.4rem; }
      .history-list { display: grid; gap: 14px; }
      .history-item {
        background: white; border: 1px solid #e4ebf3; border-radius: 4px; padding: 18px;
      }
      .history-main { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
      .history-main p, .history-item p { margin: 0; color: #5a7694; }
      .history-score { margin: 12px 0; font-weight: 700; color: #17375d; }
      .history-item ul { margin: 8px 0 0; padding-left: 18px; color: #425d7b; }
      .state-card { background: #f8fbff; border: 1px solid #dfeaf8; border-radius: 4px; padding: 18px; }
      .error-card { border-color: #f3c8c8; background: #fff5f5; color: #9b1c1c; }
      @media (max-width: 760px) { .detail-grid, .topbar, .history-header { grid-template-columns: 1fr; display: grid; } }
    `
  ]
})
export class FacilityDetailComponent implements OnInit {
  facility: Facility | null = null;
  inspections: Inspection[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private facilityService: FacilityService
  ) {}

  ngOnInit(): void {
    const facilityId = Number(this.route.snapshot.paramMap.get('id'));

    combineLatest([
      this.facilityService.getFacility(facilityId),
      this.facilityService.getFacilityInspections(facilityId)
    ]).subscribe({
      next: ([facility, inspections]) => {
        this.facility = facility;
        this.inspections = inspections;
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load facility details.';
        this.loading = false;
      }
    });
  }
}
