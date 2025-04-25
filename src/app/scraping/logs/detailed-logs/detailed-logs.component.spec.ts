import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedLogsComponent } from './detailed-logs.component';

describe('DetailedLogsComponent', () => {
  let component: DetailedLogsComponent;
  let fixture: ComponentFixture<DetailedLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailedLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
