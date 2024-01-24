import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {AutocompleteComponent} from "../../shared/autocomplete/autocomplete.component";

export interface RegisterForm {
  firstName : FormControl<string>,
  lastName : FormControl<string>
  email : FormControl<string>,
  password : FormControl<string>
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    AutocompleteComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form : FormGroup<RegisterForm> = new FormGroup<RegisterForm>({
    firstName : new FormControl<string>('', {nonNullable : true}),
    lastName : new FormControl<string>('', {nonNullable : true}),
    email : new FormControl<string>('', {nonNullable : true}),
    password : new FormControl<string>('', {nonNullable: true}),
  })

  onSubmit(){
    console.log("Submit register form", this.form.value)
    this.form.reset()
  }
}
