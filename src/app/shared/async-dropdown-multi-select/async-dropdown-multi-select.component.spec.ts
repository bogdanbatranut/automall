import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncDropdownMultiSelectComponent } from './async-dropdown-multi-select.component';

describe('AsyncDropdownMultiSelectComponent', () => {
  let component: AsyncDropdownMultiSelectComponent;
  let fixture: ComponentFixture<AsyncDropdownMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncDropdownMultiSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsyncDropdownMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
