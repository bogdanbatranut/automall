import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifiableCheckButtonComponent } from './identifiable-check-button.component';

describe('IdentifiableCheckButtonComponent', () => {
  let component: IdentifiableCheckButtonComponent;
  let fixture: ComponentFixture<IdentifiableCheckButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentifiableCheckButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdentifiableCheckButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
