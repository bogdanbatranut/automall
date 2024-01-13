import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapeStartComponent } from './scrape-start.component';

describe('ScrapeStartComponent', () => {
  let component: ScrapeStartComponent;
  let fixture: ComponentFixture<ScrapeStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrapeStartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrapeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
