
import { Routes } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';

export const routes: Routes = [
  { path: '', component: VehicleListComponent }, //default one 
  { 
    path: 'service-records', 
    loadComponent: () => import('./components/vehicle-records-list/vehicle-records-list.component')
      .then(m => m.ServiceRecordsListComponent)
  },
  { 
    path: 'vehicle-search', 
    loadComponent: () => import('./components/vehicle-search/vehicle-search.component')
      .then(m => m.VehicleSearchComponent)
  },
  { path: '**', redirectTo: '' },
];