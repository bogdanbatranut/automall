import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDistributionComponent } from './price-distribution.component';

describe('PriceDistributionComponent', () => {
  let component: PriceDistributionComponent;
  let fixture: ComponentFixture<PriceDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceDistributionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriceDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
