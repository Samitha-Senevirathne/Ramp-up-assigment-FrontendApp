import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
//import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { VehicleImportComponent } from '../components/vehicle-import/vehicle-import.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [VehicleImportComponent],
  imports: [
    
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule
  ]
})
export class MaterialModule { }
