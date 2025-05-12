import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from "@angular/forms";
import { AsyncPipe, JsonPipe, NgFor } from "@angular/common";

@Component({
  selector: 'app-single-select',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleSelectComponent),
      multi: true
    },
  ],
})
export class SingleSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() options: Array<{ id: any, label: string }> = [];
  @Input() name: string = "";

  form: FormGroup = new FormGroup({
    radios: new FormArray([])
  });

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    console.log("CHANGES ", this.options)
    if (changes['options'] && Array.isArray(this.options)) {
      this.createFormControls();
    }
  }

  createFormControls(): void {
    const radiosArray = this.form.get('radios') as FormArray;
    radiosArray.clear();
    console.log("OPTS ", this.options, Array.isArray(this.options), this.options instanceof FormArray)
    this.options.forEach(option => {
      radiosArray.push(new FormControl({id: option.id, label: option.label})); // Add a FormControl for each option
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    if (obj && Array.isArray(obj)) {
      const radiosArray = this.form.get('radios') as FormArray;
      obj.forEach((value: boolean, index: number) => {
        if (radiosArray.at(index)) {
          radiosArray.at(index).setValue(value, { emitEvent: false });
        }
      });
    }
  }
}
