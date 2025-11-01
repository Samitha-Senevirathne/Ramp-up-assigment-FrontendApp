import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTostComponent } from './vehicle-tost.component';

describe('VehicleTostComponent', () => {
  let component: VehicleTostComponent;
  let fixture: ComponentFixture<VehicleTostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleTostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
