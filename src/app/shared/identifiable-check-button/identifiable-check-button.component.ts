import {Component, forwardRef} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, ValidationErrors,
  Validator,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-identifiable-check-button',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './identifiable-check-button.component.html',
  styleUrl: './identifiable-check-button.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentifiableCheckButtonComponent),
      multi: true,
    },
  ],
})
export class IdentifiableCheckButtonComponent implements ControlValueAccessor, Validator{

  form : FormGroup

  constructor() {
    this.form = new FormGroup<any>({
      id : new FormControl(""),
      name : new FormControl("")
    })
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.form.patchValue(obj)
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }



}
