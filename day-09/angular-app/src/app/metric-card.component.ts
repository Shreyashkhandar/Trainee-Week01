import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="metric-card" [ngClass]="variant">
      <span>{{ label }}</span>
      <strong>{{ value }}<small *ngIf="suffix">{{ suffix }}</small></strong>
    </article>
  `,
  styles: [`
    :host { display: block; }
    .metric-card { min-height: 112px; padding: 18px; border: 1px solid #d9ded1; background: #fffefa; }
    .metric-card span { display: block; margin-bottom: 12px; color: #68746c; font-size: 12px; }
    .metric-card strong { color: #263e35; font: 30px/1 Georgia, serif; }
    .metric-card small { padding-left: 3px; font: 15px Arial, sans-serif; }
    .metric-card.green { border-top: 3px solid #668c62; }
    .metric-card.gold { border-top: 3px solid #d3a744; }
    .metric-card.terracotta { border-top: 3px solid #b96f53; }
  `]
})
export class MetricCardComponent {
  @Input() label = '';
  @Input() value: string | number = '';
  @Input() suffix = '';
  @Input() variant = '';
}