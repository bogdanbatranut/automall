import { Component } from '@angular/core';
import { AsyncDropdownMultiSelectComponent } from '../../shared/async-dropdown-multi-select/async-dropdown-multi-select.component';
import {MultiSelectComponent} from "../../shared/select/multi-select/multi-select.component";

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [
    AsyncDropdownMultiSelectComponent,
    MultiSelectComponent
  ],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css'
})
export class LearnComponent {

}
