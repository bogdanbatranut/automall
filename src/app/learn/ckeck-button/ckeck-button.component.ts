import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-ckeck-button',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './ckeck-button.component.html',
  styleUrl: './ckeck-button.component.css',
  providers : [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CkeckButtonComponent),
      multi: true
    },
  ]
})
export class CkeckButtonComponent implements ControlValueAccessor{

  onChange: any = () => {};
  onTouched: any = () => {};

  form : FormGroup
  // data : {id : number, name : string, value : boolean}

  constructor() {

    this.form = new FormGroup({
      id : new FormControl(0),
      name : new FormControl(""),
      checkButton : new FormControl({})
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
    // return this.form.valid ? null : { passwords: { valid: false } };
    return null
  }
}
