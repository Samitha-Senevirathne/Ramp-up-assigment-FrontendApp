

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RecordsService } from '../../services/vehicle-records.service';
import { ServiceRecordFormComponent } from '../vehicle-records-form/vehicle-records-form.component';

@Component({
  selector: 'app-service-records-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './vehicle-records-list.component.html',
  styleUrls: ['./vehicle-records-list.component.scss'],
})
export class ServiceRecordsListComponent implements OnInit {
  records: any[] = [];
  allRecords: any[] = [];
  vehicles: any[] = [];
  selectedVIN = '';
  selectedVehicle: any = null;
  showColumnFilter = false;
  
  availableColumns = [
    { value: 'vin', label: 'VIN', checked: true },
    { value: 'description', label: 'Description', checked: true },
    { value: 'service_date', label: 'Service Date', checked: true },
    { value: 'cost', label: 'Cost', checked: true },
  ];
  
  displayedColumns: string[] = [];

  constructor(
    private recordsService: RecordsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log('ServiceRecordsListComponent initialized');
    this.updateDisplayedColumns();
    this.loadRecords();
    this.loadVehicles();
  }

  loadRecords() {
    console.log('Loading records...');
    this.recordsService
      .getAllRecords()
      .then((res: any) => {
        console.log('Records Response:', res);
        this.allRecords = res?.data?.allRecords || [];
        
        // Reapply the filter after loading
        this.applyFilter();
        
        console.log('All records loaded:', this.allRecords.length);
      })
      .catch((err) => {
        console.error('Error fetching records:', err);
      });
  }

  loadVehicles() {
    console.log('Loading vehicles for dropdown...');
    this.recordsService
      .getAllVehiclesForDropdown()
      .then((res: any) => {
        console.log('Vehicles Response:', res);
        this.vehicles = res?.data?.findAllVehiclesNoPagination || [];
        console.log('Vehicles loaded:', this.vehicles.length);
      })
      .catch((err) => {
        console.error('Error fetching vehicles:', err);
      });
  }

  // Helper method to apply filter
  applyFilter() {
    if (this.selectedVIN === '' || !this.selectedVIN) {
      this.records = [];
    } else {
      this.records = this.allRecords.filter((r) => r.vin === this.selectedVIN);
    }
    console.log('Filter applied, showing:', this.records.length, 'records');
  }

  updateDisplayedColumns() {
    this.displayedColumns = this.availableColumns
      .filter(col => col.checked)
      .map(col => col.value);
    
    this.displayedColumns.push('actions');
    console.log('Displayed columns:', this.displayedColumns);
  }

  toggleColumnFilter() {
    this.showColumnFilter = !this.showColumnFilter;
  }

  onVehicleSelect() {
    console.log('Selected VIN:', this.selectedVIN);
    
    if (this.selectedVIN === '' || !this.selectedVIN) {
      this.records = [];
      this.selectedVehicle = null;
      console.log('No VIN selected, showing empty table');
    } else {
      this.records = this.allRecords.filter((r) => r.vin === this.selectedVIN);
      this.selectedVehicle = this.vehicles.find((v) => v.vin === this.selectedVIN);
      
      console.log('Filtered records:', this.records.length);
      console.log('Selected vehicle:', this.selectedVehicle);
    }
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(ServiceRecordFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadRecords();
      }
    });
  }

  openEditDialog(record: any) {
    const dialogRef = this.dialog.open(ServiceRecordFormComponent, {
      width: '500px',
      data: { record },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadRecords();
      }
    });
  }

  deleteRecord(id: string) {
    if (!confirm('Are you sure you want to delete this record?')) return;

    this.recordsService
      .deleteRecord(id)
      .then(() => {
        alert('Record deleted successfully!');
        this.loadRecords();
      })
      .catch((err) => {
        console.error('Error deleting record:', err);
        alert('Failed to delete record');
      });
  }

  resetFilter() {
    this.selectedVIN = '';
    this.selectedVehicle = null;
    this.records = [];
  }
}