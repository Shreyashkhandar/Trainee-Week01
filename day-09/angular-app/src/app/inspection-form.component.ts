import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FacilityService } from './facility.service';
import { Facility, InspectionSubmission, InspectionStatus, WasteLevel } from './models';

type InspectionFormControls = {
  facilityId: FormControl<number>;
  inspectionDate: FormControl<string>;
  inspector: FormControl<string>;
  cleanlinessScore: FormControl<number>;
  odorScore: FormControl<number>;
  wasteLevel: FormControl<WasteLevel>;
  remarks: FormControl<string>;
  status: FormControl<InspectionStatus>;
};

@Component({
  selector: 'app-inspection-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <section class="page-shell">
      <div class="topbar">
        <div>
          <p class="eyebrow">Inspection Entry</p>
          <h1>Record an inspection</h1>
        </div>
        <a routerLink="/" class="secondary-btn">Back to dashboard</a>
      </div>

      <div *ngIf="loading" class="state-card">Loading facility information...</div>
      <div *ngIf="loadError" class="error-box" role="alert">{{ loadError }}</div>

      <form *ngIf="!loading && !loadError" [formGroup]="inspectionForm" (ngSubmit)="submitInspection()" class="panel" novalidate>
        <div class="field-group">
          <label for="facilityId">Facility</label>
          <select id="facilityId" formControlName="facilityId">
            <option [ngValue]="0" disabled>Select a facility</option>
            <option *ngFor="let facility of facilities" [ngValue]="facility.id">{{ facility.name }} · {{ facility.location }}</option>
          </select>
          <small *ngIf="inspectionForm.get('facilityId')?.touched && inspectionForm.get('facilityId')?.invalid">Choose a facility.</small>
        </div>

        <div class="form-grid">
          <div class="field-group">
            <label for="inspectionDate">Inspection date</label>
            <input id="inspectionDate" type="date" [max]="today" formControlName="inspectionDate" />
            <small *ngIf="inspectionForm.get('inspectionDate')?.touched && inspectionForm.get('inspectionDate')?.invalid">Enter a valid inspection date no later than today.</small>
          </div>

          <div class="field-group">
            <label for="inspector">Inspector</label>
            <input id="inspector" type="text" formControlName="inspector" />
            <small *ngIf="inspectionForm.get('inspector')?.touched && inspectionForm.get('inspector')?.invalid">Inspector name is required.</small>
          </div>

          <div class="field-group">
            <label for="cleanlinessScore">Cleanliness score (0-100)</label>
            <input id="cleanlinessScore" type="number" min="0" max="100" formControlName="cleanlinessScore" />
            <small *ngIf="inspectionForm.get('cleanlinessScore')?.touched && inspectionForm.get('cleanlinessScore')?.invalid">Use a score from 0 to 100.</small>
          </div>

          <div class="field-group">
            <label for="odorScore">Odor score (0-100)</label>
            <input id="odorScore" type="number" min="0" max="100" formControlName="odorScore" />
            <small *ngIf="inspectionForm.get('odorScore')?.touched && inspectionForm.get('odorScore')?.invalid">Use a score from 0 to 100.</small>
          </div>

          <div class="field-group">
            <label for="wasteLevel">Waste level</label>
            <select id="wasteLevel" formControlName="wasteLevel">
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </div>

          <div class="field-group">
            <label for="status">Inspection status</label>
            <select id="status" formControlName="status">
              <option value="Pass">Pass</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        <div class="field-group">
          <label for="remarks">Remarks</label>
          <textarea id="remarks" rows="4" maxlength="500" formControlName="remarks"></textarea>
        </div>

        <div class="actions">
          <button type="submit" class="primary-btn" [disabled]="submitting">
            {{ submitting ? 'Submitting...' : 'Submit inspection' }}
          </button>
        </div>

        <div *ngIf="successMessage" class="success-box">{{ successMessage }}</div>
        <div *ngIf="errorMessage" class="error-box">{{ errorMessage }}</div>
      </form>
    </section>
  `,
  styles: [
    `
      :host { display: block; padding: 24px; }
      .page-shell { max-width: 900px; margin: 0 auto; }
      .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
      .eyebrow { margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.08em; color: #546d8d; font-size: 12px; font-weight: 700; }
      h1 { margin: 0; font-size: 2rem; }
      .secondary-btn, .primary-btn { border-radius: 4px; padding: 10px 16px; font-weight: 700; border: none; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }
      .secondary-btn { background: #ebf3ff; color: #0d47a1; }
      .primary-btn { background: #1a73e8; color: white; cursor: pointer; }
      .primary-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      .panel {
        background: white; border: 1px solid #e4ebf3; border-radius: 4px; box-shadow: 0 8px 18px rgba(16,35,61,.04); padding: 22px;
      }
      .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
      .field-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
      label { font-weight: 700; color: #1d3557; }
      input, select, textarea { width: 100%; border: 1px solid #dfe7f2; border-radius: 4px; padding: 10px 12px; font-size: 1rem; }
      textarea { resize: vertical; }
      small { color: #be3b3b; }
      .actions { margin-top: 12px; }
      .success-box, .error-box, .state-card {
        margin-top: 16px; border-radius: 4px; padding: 12px 14px;
      }
      .success-box { background: #eafaf1; color: #1a7a46; }
      .error-box { background: #fff5f5; color: #9b1c1c; }
      .state-card { background: #f8fbff; border: 1px solid #dfeaf8; }
      @media (max-width: 700px) { .form-grid, .topbar { display: grid; grid-template-columns: 1fr; } }
    `
  ]
})
export class InspectionFormComponent implements OnInit {
  facilities: Facility[] = [];
  today = new Date().toISOString().slice(0, 10);
  loading = true;
  submitting = false;
  successMessage = '';
  errorMessage = '';
  loadError = '';

  inspectionForm: FormGroup<InspectionFormControls>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facilityService: FacilityService
  ) {
    this.inspectionForm = this.fb.nonNullable.group({
      facilityId: [0, [Validators.required, Validators.min(1)]],
      inspectionDate: [this.today, [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      inspector: ['', [Validators.required, Validators.minLength(2)]],
      cleanlinessScore: [80, [Validators.required, Validators.min(0), Validators.max(100)]],
      odorScore: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      wasteLevel: ['Low' as WasteLevel, Validators.required],
      remarks: ['', Validators.maxLength(500)],
      status: ['Pass' as InspectionStatus, Validators.required]
    });
  }

  ngOnInit(): void {
    this.facilityService.getFacilities().subscribe({
      next: (facilities) => {
        this.facilities = facilities;
        const selectedFacility = Number(this.route.snapshot.queryParamMap.get('facilityId'));
        if (facilities.some((facility) => facility.id === selectedFacility)) {
          this.inspectionForm.controls.facilityId.setValue(selectedFacility);
        }
        this.loading = false;
      },
      error: () => {
        this.loadError = 'Unable to load facilities. Check that the local API is running and try again.';
        this.loading = false;
      }
    });
  }

  submitInspection(): void {
    if (this.inspectionForm.invalid) {
      this.inspectionForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload: InspectionSubmission = this.inspectionForm.getRawValue();

    this.facilityService.createInspection(payload).subscribe({
      next: () => {
        this.successMessage = 'Inspection submitted successfully.';
        this.submitting = false;
      },
      error: () => {
        this.errorMessage = 'Submission failed. Please check your data and try again.';
        this.submitting = false;
      }
    });
  }
}
