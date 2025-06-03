import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {ParentFormComponent} from "../parent-form/parent-form.component";

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [
    RouterOutlet,
    ParentFormComponent
  ],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css'
})
export class LearnComponent {

}
