import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FacilityService } from './facility.service';
import { DashboardMetrics, Facility, Inspection, InspectionSubmission } from './models';

describe('FacilityService', () => {
  let service: FacilityService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(FacilityService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('loads dashboard metrics and the facility collection from the API', () => {
    const metrics: DashboardMetrics = {
      totalFacilities: 1,
      inspectedFacilities: 1,
      pendingInspections: 0,
      averageCleanlinessScore: 90
    };
    const facilities: Facility[] = [];

    service.getDashboardMetrics().subscribe((result) => expect(result).toEqual(metrics));
    service.getFacilities().subscribe((result) => expect(result).toEqual(facilities));

    http.expectOne('http://localhost:3000/api/dashboard').flush(metrics);
    http.expectOne('http://localhost:3000/api/facilities').flush(facilities);
  });

  it('loads a facility and its inspection history by route id', () => {
    const facility: Facility = {
      id: 7,
      name: 'Training Facility',
      type: 'Training Center',
      status: 'Operational',
      location: 'Central District',
      region: 'Central',
      manager: 'A. Example',
      cleanlinessScore: 90,
      complaints: 0,
      riskLevel: 'Low',
      lastInspectionDate: '2026-09-20',
      description: 'Training facility.'
    };
    const inspections: Inspection[] = [];

    service.getFacility(7).subscribe((result) => expect(result).toEqual(facility));
    service.getFacilityInspections(7).subscribe((result) => expect(result).toEqual(inspections));

    http.expectOne('http://localhost:3000/api/facilities/7').flush(facility);
    http.expectOne('http://localhost:3000/api/facilities/7/inspections').flush(inspections);
  });

  it('posts a typed inspection submission', () => {
    const submission: InspectionSubmission = {
      facilityId: 7,
      inspectionDate: '2026-09-27',
      inspector: 'A. Example',
      cleanlinessScore: 90,
      odorScore: 10,
      wasteLevel: 'Low',
      remarks: 'All checks complete.',
      status: 'Pass'
    };
    const inspection: Inspection = { id: 11, ...submission };

    service.createInspection(submission).subscribe((result) => expect(result).toEqual(inspection));

    const request = http.expectOne('http://localhost:3000/api/inspections');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(submission);
    request.flush(inspection, { status: 201, statusText: 'Created' });
  });
});