import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FacilityDetailComponent } from './facility-detail.component';
import { InspectionFormComponent } from './inspection-form.component';

export const routes: Routes = [
	{ path: '', component: DashboardComponent, title: 'Facility dashboard' },
	{ path: 'facilities/:id', component: FacilityDetailComponent, title: 'Facility details' },
	{ path: 'inspections/new', component: InspectionFormComponent, title: 'New inspection' },
	{ path: '**', redirectTo: '' }
];
