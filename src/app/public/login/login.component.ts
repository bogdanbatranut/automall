import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

export interface LoginForm {
  email : FormControl<string>,
  password : FormControl<string>
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  form : FormGroup<LoginForm> = new FormGroup<LoginForm>({
    email : new FormControl<string>('', {nonNullable : true}),
    password : new FormControl<string>('', {nonNullable: true}),
  })

  onSubmit(){
    console.log("Submit login form", this.form.value)
    this.form.reset()
  }

}
