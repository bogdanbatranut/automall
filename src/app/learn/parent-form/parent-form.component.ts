import { Component } from '@angular/core';
import {CkeckButtonComponent} from "../ckeck-button/ckeck-button.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-parent-form',
  standalone: true,
  imports: [
    CkeckButtonComponent,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './parent-form.component.html',
  styleUrl: './parent-form.component.css'
})
export class ParentFormComponent {
  form : FormGroup

  constructor(private fb : FormBuilder) {
    this.form = this.fb.group({
      child : {checkButton : true, name : "someName", id : 4}
    })

    this.form.valueChanges.subscribe((value) => {
    })
  }
}
