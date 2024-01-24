import { Component } from '@angular/core';
import {debounceTime, distinctUntilChanged, map, Observable, OperatorFunction} from "rxjs";
import {CommonModule, JsonPipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent {
  selectedCar: number  = 0;

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
}
