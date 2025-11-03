import { Component, OnInit, OnDestroy } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { VehicleFormComponent } from '../vehicle-form/vehicle-form.component';
import { MatDialog } from '@angular/material/dialog';
import { VehicleImportComponent } from '../vehicle-import/vehicle-import.component';
import { VehicleExportComponent } from '../vehicle-export/vehicle-export.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
})
export class VehicleListComponent implements OnInit, OnDestroy {
  vehicles: any[] = [];
  displayedColumns = [
    'id',
    'first_name',
    'last_name',
    'email',
    'car_make',
    'car_model',
    'manufactured_date',
    'age_of_vehicle',
    'actions',
  ];
  searchText = '';
  page = 1;
  private searchSubject = new Subject<string>();

  constructor(
    private vehicleService: VehicleService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadVehicles();
    
    // Setup debounced search
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  loadVehicles() {
    this.vehicleService
      .findAllVehicles(this.page)
      .then((res) => {
        console.log('Vehicle Data:', res);
        this.vehicles = res.data?.findAllVehicles || [];
      })
      .catch((err) => console.error('Error fetching vehicles', err));
  }

  onSearchChange() {
    this.searchSubject.next(this.searchText);
  }

  performSearch(searchTerm: string) {
    if (searchTerm.trim() === '') {
      this.loadVehicles();
      return;
    }

    this.vehicleService
      .searchByModel(searchTerm)
      .then((res) => {
        this.vehicles = res.data?.searchByModel || [];
      })
      .catch((err) => console.error('Error searching vehicles', err));
  }

  search() {
    this.performSearch(this.searchText);
  }

  deleteVehicle(id: string) {
    if (!confirm('Are you sure to delete?')) return;

    this.vehicleService
      .deleteVehicle(id)
      .then(() => {
        alert('Deleted successfully');
        this.loadVehicles();
      })
      .catch((err) => console.error('Error deleting vehicle', err));
  }

  nextPage() {
    this.page++;
    this.loadVehicles();
  }

  prevPage() {
    if (this.page > 1) this.page--;
    this.loadVehicles();
  }

  updateVehicle(vehicle: any) {
    const dialogRef = this.dialog.open(VehicleFormComponent, {
      width: '400px',
      data: { vehicle },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadVehicles();
      }
    });
  }

  openImportDialog() {
    const dialogRef = this.dialog.open(VehicleImportComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadVehicles();
      }
    });
  }

  openExportDialog() {
    this.dialog.open(VehicleExportComponent, { width: '400px' });
  }
}