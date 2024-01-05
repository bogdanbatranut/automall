import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeckButtonComponent } from './ckeck-button.component';

describe('CkeckButtonComponent', () => {
  let component: CkeckButtonComponent;
  let fixture: ComponentFixture<CkeckButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CkeckButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CkeckButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
