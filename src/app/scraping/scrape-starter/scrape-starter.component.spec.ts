import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapeStarterComponent } from './scrape-starter.component';

describe('ScrapeStarterComponent', () => {
  let component: ScrapeStarterComponent;
  let fixture: ComponentFixture<ScrapeStarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrapeStarterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrapeStarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
