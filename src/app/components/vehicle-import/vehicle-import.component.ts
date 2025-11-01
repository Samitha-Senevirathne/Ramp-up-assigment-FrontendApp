import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-import-dialog',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatDialogModule, MatButtonModule],
  templateUrl: './vehicle-import.component.html',
})
export class VehicleImportComponent {
  selectedFile?: File;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<VehicleImportComponent>
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:3000/import/upload', formData).subscribe({
      next: () => {
        alert('File uploaded successfully!');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        alert('Error uploading file.');
      },
    });
  }
}
