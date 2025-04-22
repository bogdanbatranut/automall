import {Component, forwardRef, Input} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray, FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from "@angular/forms";
import {AsyncPipe, JsonPipe, NgFor} from "@angular/common";

@Component({
  selector: 'app-multiselect',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './multiselect.component.html',
  styleUrl: './multiselect.component.css',
  providers : [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true
    },
  ],
})
export class MultiselectComponent implements ControlValueAccessor{
  form : FormGroup

  onChange: any = () => {

  };
  onTouched: any = () => {};

  get label() {
    return this.form.get("label")?.value
  }

  constructor(private fb : FormBuilder) {

    this.form = new FormGroup({
      id : new FormControl(),
      label : new FormControl(),
      checked : new FormControl(true)
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
    this.form.patchValue({id : obj.id , label : obj.label, checked: obj.checked })
  }
}
