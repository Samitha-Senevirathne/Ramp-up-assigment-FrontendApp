import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent {
  vehicle: any = {};

  constructor(
    private vehicleService: VehicleService,
    public dialogRef: MatDialogRef<VehicleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.vehicle = { ...data.vehicle }; //pre-fill data
  }

  saveChanges() {
  const input = {
    id: this.vehicle.id,
    first_name: this.vehicle.first_name,
    last_name: this.vehicle.last_name,
    car_model: this.vehicle.car_model,
    manufactured_date: new Date(this.vehicle.manufactured_date).toISOString(), // ensure valid date format
  };

  this.vehicleService.updateVehicle(input)
    .then(() => {
      alert('Vehicle updated successfully!');
      this.dialogRef.close(true);
    })
    .catch(err => {
      console.error('Update error:', err);
      alert('Failed to update vehicle. Check console for details.');
    });
}


  cancel() {
    this.dialogRef.close(false);
  }
}
