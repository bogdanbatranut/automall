import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLogsComponent } from './page-logs.component';

describe('PageLogsComponent', () => {
  let component: PageLogsComponent;
  let fixture: ComponentFixture<PageLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
