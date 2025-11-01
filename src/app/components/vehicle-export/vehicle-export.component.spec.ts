import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleExportComponent } from './vehicle-export.component';

describe('VehicleExportComponent', () => {
  let component: VehicleExportComponent;
  let fixture: ComponentFixture<VehicleExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleExportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
