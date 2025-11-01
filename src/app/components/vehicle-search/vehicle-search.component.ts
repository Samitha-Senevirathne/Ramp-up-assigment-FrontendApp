import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { RecordsService } from '../../services/vehicle-records.service';

@Component({
  selector: 'app-vehicle-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
  ],
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.scss'],
})
export class VehicleSearchComponent {
  searchVIN = '';
  vehicle: any = null;
  serviceRecords: any[] = [];
  displayedColumns = ['description', 'service_date', 'cost'];

  constructor(private recordsService: RecordsService) {}

  searchByVIN() {
    console.log('Searching for VIN:', this.searchVIN);
    
    if (!this.searchVIN.trim()) {
      alert('Please enter a VIN');
      return;
    }

    this.recordsService
      .getVehicleWithRecords(this.searchVIN.trim())
      .then((res: any) => {
        console.log('Search Response:', res);
        console.log('Response Data:', res?.data);
        
        const data = res?.data?.findVehicleByVIN;
        console.log('Vehicle Data:', data);
        
        if (data) {
          this.vehicle = data;
          this.serviceRecords = data.serviceRecords || [];
          console.log('Vehicle:', this.vehicle);
          console.log('Service Records:', this.serviceRecords);
        } else {
          alert('Vehicle not found!');
          this.vehicle = null;
          this.serviceRecords = [];
        }
      })
      .catch((err) => {
        console.error('Error searching vehicle:', err);
        console.error('Error details:', JSON.stringify(err, null, 2));
        alert('Error searching vehicle');
      });
  }

  reset() {
    console.log('Resetting search');
    this.searchVIN = '';
    this.vehicle = null;
    this.serviceRecords = [];
  }
}