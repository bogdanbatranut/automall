import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  providers : [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    },
  ],
})
export class SliderComponent implements ControlValueAccessor{

  onChange: any = () => {};
  onTouched: any = () => {};

  @Input() min : number
  @Input() max : number
  @Input() label : string

  valueStr : string = "0"

  form : FormGroup

  constructor() {
    this.min = 0
    this.max = 100
    this.label = ""
    this.form = new FormGroup({
      value : new FormControl(0)
    })

    this.form.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
      console.log(String(value.value))
      if (value.value) {
        this.valueStr = Number(value.value).toLocaleString("ro-RO")
      }
    })
  }

  onSlide(val : any){
    this.valueStr = Number(val.target.value).toLocaleString("ro-RO")
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  writeValue(obj: any): void {
    console.log("Slider writeValue: ", obj)
  }



}
