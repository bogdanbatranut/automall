import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketsBrandsComponent } from './markets-brands.component';

describe('MarketsBrandsComponent', () => {
  let component: MarketsBrandsComponent;
  let fixture: ComponentFixture<MarketsBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketsBrandsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketsBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
