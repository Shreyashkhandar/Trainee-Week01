import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load dashboard summary and facilities', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.ngOnInit();

    const metricsRequest = httpTestingController.expectOne('http://localhost:5001/api/dashboard/metrics');
    metricsRequest.flush({ success: true, data: { totalFacilities: 3, activeFacilities: 2, pendingInspections: 1, completedInspections: 2, openComplaints: 4, criticalComplaints: 1, averageCleanlinessScore: 88 } });

    const facilitiesRequest = httpTestingController.expectOne('http://localhost:5001/api/facilities');
    facilitiesRequest.flush({ success: true, data: [{ id: 1, name: 'Clinic A', facilityCode: 'FAC-001', location: 'Nairobi', facilityType: 'Clinic', status: 'Active', cleanlinessScore: 89, lastInspectionDate: '2026-09-18' }] });

    expect(app.metrics?.totalFacilities).toBe(3);
    expect(app.facilities.length).toBe(1);
  });
});
