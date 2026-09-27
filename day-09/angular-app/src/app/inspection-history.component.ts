import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Inspection } from './models';

@Component({
  selector: 'app-inspection-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="inspections.length; else emptyHistory" class="history-list">
      <article *ngFor="let inspection of inspections" class="history-item">
        <header class="history-heading">
          <div>
            <span class="status-badge" [ngClass]="inspection.status.toLowerCase()">{{ inspection.status }}</span>
            <p class="inspector">{{ inspection.inspector }}</p>
          </div>
          <time>{{ inspection.inspectionDate | date:'mediumDate' }}</time>
        </header>
        <div class="history-scores">
          <span>Cleanliness <strong>{{ inspection.cleanlinessScore }}%</strong></span>
          <span>Odor <strong>{{ inspection.odorScore }}%</strong></span>
          <span>Waste <strong>{{ inspection.wasteLevel }}</strong></span>
        </div>
        <p class="remarks">{{ inspection.remarks || 'No remarks were recorded.' }}</p>
      </article>
    </div>
    <ng-template #emptyHistory>
      <div class="empty-history">No inspections have been recorded for this facility.</div>
    </ng-template>
  `,
  styles: [`
    :host { display: block; }
    .history-list { display: grid; gap: 12px; }
    .history-item { padding: 16px; border: 1px solid #e2e4da; background: #fffefa; }
    .history-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
    .history-heading time { color: #758078; font-size: 13px; }
    .inspector { margin: 8px 0 0; font-weight: 600; }
    .history-scores { display: flex; flex-wrap: wrap; gap: 8px 22px; margin: 16px 0 10px; color: #68746c; font-size: 13px; }
    .history-scores strong { padding-left: 4px; color: #30473e; }
    .remarks { margin: 0; color: #68746c; line-height: 1.5; }
    .status-badge { display: inline-block; padding: 5px 8px; background: #e7eee1; color: #315442; font-size: 11px; font-weight: 700; }
    .status-badge.warning { background: #f7eed9; color: #876219; }
    .status-badge.critical { background: #f4e3dc; color: #963f2f; }
    .empty-history { padding: 18px; border: 1px dashed #cdd2c6; color: #6d786f; }
  `]
})
export class InspectionHistoryComponent {
  @Input() inspections: Inspection[] = [];
}