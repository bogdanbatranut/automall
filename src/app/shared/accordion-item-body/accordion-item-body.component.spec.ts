import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionItemBodyComponent } from './accordion-item-body.component';

describe('AccordionItemBodyComponent', () => {
  let component: AccordionItemBodyComponent;
  let fixture: ComponentFixture<AccordionItemBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionItemBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccordionItemBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
