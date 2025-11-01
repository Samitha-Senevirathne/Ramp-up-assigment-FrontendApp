
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RecordsService } from '../../services/vehicle-records.service';

@Component({
  selector: 'app-service-record-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './vehicle-records-form.component.html',
  styleUrls: ['./vehicle-records-form.component.scss'],
})
export class ServiceRecordFormComponent implements OnInit {
  record: any = {
    vin: '',
    description: '',
    service_date: new Date(),
    cost: null,
  };

  isEdit = false;

  constructor(
    private recordsService: RecordsService,
    public dialogRef: MatDialogRef<ServiceRecordFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data?.record) {
      this.isEdit = true;
      //clean the record data - remove __typename
      const { __typename, ...cleanRecord } = this.data.record;
      this.record = { ...cleanRecord };
      
      //convert string date to Date object
      if (this.record.service_date) {
        this.record.service_date = new Date(this.record.service_date);
      }
    }
  }

  save() {
    //remove __typename if it exists
    const { __typename, ...cleanRecord } = this.record;
    
    if (this.isEdit) {
      //update - ensure we have id, vin, description, service_date
      const updateInput = {
        id: cleanRecord.id,
        vin: cleanRecord.vin,
        description: cleanRecord.description,
        service_date: cleanRecord.service_date,
        cost: cleanRecord.cost,
      };
      
      console.log('Updating with clean input:', updateInput);
      
      this.recordsService
        .updateRecord(updateInput)
        .then(() => {
          alert('Record updated successfully!');
          this.dialogRef.close(true);
        })
        .catch((err) => {
          console.error('Error updating record:', err);
          alert('Failed to update record: ' + (err.message || 'Unknown error'));
        });
    } else {
      // Create - only vin, description, service_date, cost
      const createInput = {
        vin: cleanRecord.vin,
        description: cleanRecord.description,
        service_date: cleanRecord.service_date,
        cost: cleanRecord.cost,
      };
      
      console.log('Creating with clean input:', createInput);
      
      this.recordsService
        .createRecord(createInput)
        .then(() => {
          alert('Record created successfully!');
          this.dialogRef.close(true);
        })
        .catch((err) => {
          console.error('Error creating record:', err);
          alert('Failed to create record: ' + (err.message || 'Unknown error'));
        });
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}