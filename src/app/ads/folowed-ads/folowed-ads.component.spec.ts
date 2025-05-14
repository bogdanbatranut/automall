import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolowedAdsComponent } from './folowed-ads.component';

describe('FolowedAdsComponent', () => {
  let component: FolowedAdsComponent;
  let fixture: ComponentFixture<FolowedAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolowedAdsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FolowedAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
