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
    this.loadVehicles();
  }

  loadRecords() {
    console.log('Loading records for VIN:', this.selectedVIN);

    // if no VIN is selected  don't load anything
    if (!this.selectedVIN) {
      this.records = [];
      return;
    }

    // to call the service to get vehicle with its service records
    this.recordsService
      .getVehicleWithRecords(this.selectedVIN)
      .then((res: any) => {
        console.log('Records Response:', res);

        // Check if we get vehicle data back
        if (res?.data?.findVehicleByVIN) {
          const vehicleData = res.data.findVehicleByVIN;

          // Update the selected vehicle info for display
          this.selectedVehicle = {
            ...this.selectedVehicle,
            ...vehicleData,
          };

          // Get the service records array
          const serviceRecords = vehicleData.serviceRecords || [];

          // Add VIN to each record (since it's not in the GraphQL response)
          this.records = serviceRecords.map((record: any) => ({
            ...record,
            vin: this.selectedVIN,
          }));

          console.log('Records loaded:', this.records.length);
        } else {
          this.records = [];
        }
      })
      .catch((err) => {
        console.error('Error fetching records:', err);
        this.records = [];
      });
  }

  loadVehicles() {
    console.log('Loading vehicles for dropdown.');
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

  updateDisplayedColumns() {
    this.displayedColumns = this.availableColumns
      .filter((col) => col.checked)
      .map((col) => col.value);

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
      // Find the selected vehicle from dropdown list
      this.selectedVehicle = this.vehicles.find(
        (v) => v.vin === this.selectedVIN
      );
      console.log('Selected vehicle:', this.selectedVehicle);

      // Load service records for this vehicle
      this.loadRecords();
    }
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(ServiceRecordFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // After creating a record, reload the list if a VIN is selected
        if (this.selectedVIN) {
          this.loadRecords();
        }
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
        // After editing a record reload the list if a VIN is selected
        if (this.selectedVIN) {
          this.loadRecords();
        }
      }
    });
  }

  deleteRecord(id: string) {
    if (!confirm('Are you sure you want to delete this record?')) return;

    this.recordsService
      .deleteRecord(id)
      .then(() => {
        alert('Record deleted successfully!');
        // Aafter deleting  reload the list if a VIN is selected
        if (this.selectedVIN) {
          this.loadRecords();
        }
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
