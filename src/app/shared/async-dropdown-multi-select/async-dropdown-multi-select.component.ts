import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Item} from "../dropdown-multi-select/item";
import {AppService} from "../../app.service";
import {DropdownMultiSelectComponent} from "../dropdown-multi-select/dropdown-multi-select.component";

@Component({
  selector: 'app-async-dropdown-multi-select',
  standalone: true,
  imports: [CommonModule, DropdownMultiSelectComponent],
  templateUrl: './async-dropdown-multi-select.component.html',
  styleUrl: './async-dropdown-multi-select.component.css'
})

export class AsyncDropdownMultiSelectComponent {

  items: Item[] = [];
  currentSelectedItem: Item | null = null;
  showSearch = true;
  showError = false;
  showAll = true;
  showStatus = true;

  constructor(private appService: AppService) { }

  get checkedItems(): Item[] {
    return this.items.filter(i => i.checked);
  }

  get dropdownText(): string {
    return `<app-multi-dropdown
      [items]="items"
      [showSearch]="showSearch"
      [showAll]="showAll"
      [showStatus]="showStatus"
      [showError]="showError"
      placeholder="Select Foods"
      (itemChange)="onItemChange($event)">
</app-multi-dropdown>`;
  }

  ngOnInit(): void {
    this.appService.getFoodsAsync().subscribe(response => {
      this.items = response;
    })
  }

  onItemChange(item: Item): void {
    this.currentSelectedItem = item;
  }

  onToggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  onToggleError(): void {
    this.showError = !this.showError;
  }

  onToggleAll(): void {
    this.showAll = !this.showAll;
  }

  onToggleStatus(): void {
    this.showStatus = !this.showStatus;
  }

}
