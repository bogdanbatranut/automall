import {Component, forwardRef, Input} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from "@angular/forms";
import {JsonPipe, NgFor, NgForOf} from "@angular/common";

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [
    JsonPipe,
    NgFor,
    ReactiveFormsModule,
  ],
  providers : [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectDropdownComponent),
      multi: true
    },
  ],
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.css'
})
export class SelectDropdownComponent implements ControlValueAccessor{
  @Input() data : {id : number, label : string}[]
  form : FormGroup


  onChange: any = () => {};
  onTouched: any = () => {};


  constructor() {
    this.data = []
    this.form = new FormGroup<any>({
      selected : new FormControl({}),
      label : new FormControl("")
    })
    this.form.valueChanges.subscribe((value) => {

      this.onChange(value);
      this.onTouched();
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  writeValue(obj: any): void {
    this.form.setValue(obj)
  }

  validate(_: FormControl) {
    return null
  }

}
