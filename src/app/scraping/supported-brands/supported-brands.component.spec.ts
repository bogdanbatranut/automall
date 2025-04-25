import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportedBrandsComponent } from './supported-brands.component';

describe('SupportedBrandsComponent', () => {
  let component: SupportedBrandsComponent;
  let fixture: ComponentFixture<SupportedBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportedBrandsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportedBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
