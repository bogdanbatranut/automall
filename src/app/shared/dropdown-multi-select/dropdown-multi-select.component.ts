import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Item} from "./item";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-dropdown-multi-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dropdown-multi-select.component.html',
  styleUrls: ['./dropdown-multi-select.component.css']
})
export class DropdownMultiSelectComponent {
  _items: Item[] = [];

  @Input() placeholder: string = 'Select items'; // Default value added
  @Input() showSearch = true;
  @Input() showAll = true;
  @Input() showStatus = true;
  @Input() showError = false;
  @Output() itemChange = new EventEmitter<Item>(); // Removed invalid argument

  @Input('items')
  set items(items: Item[]) {
    this._items = items.map(item => ({
      ...item,
      uuid: item.uuid || uuidv4(),
      checked: item.checked || false,
      visible: item.visible || true
    }));
    this.filtered = [...this._items];
    this.all.visible = this.filtered.length > 0;
  }

  filtered: Item[] = [];
  all: Item = {
    id: null,
    name: 'All',
    uuid: uuidv4(),
    checked: false,
    visible: true
  };

  private searchText = '';

  isDropdownOpen = false;

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  get search(): string {
    return this.searchText;
  }

  set search(searchText: string) {
    this.searchText = searchText.toLowerCase();
    this.filtered = this.searchText
      ? this._items.filter(i => i.name.toLowerCase().includes(this.searchText))
      : [...this._items];
    this.all.visible = this.all.name.toLowerCase().includes(this.searchText);
  }

  get selected(): string {
    return this.all.checked
      ? this.all.name
      : this._items.filter(i => i.checked && i.visible).map(i => i.name).join(', ');
  }

  get isEmpty(): boolean {
    return this.filtered.filter(i => i.visible).length === 0;
  }

  get checked(): number {
    return this._items.filter(i => i.checked).length;
  }

  trackByUuid(index: number, item: Item): string {
    return item.uuid!;
  }

  onChange($event: any, item: Item): void {
    const checked = $event.target.checked;
    const index = this._items.findIndex(i => i.id === item.id);

    if (item.id === null) {
      this.all.checked = checked;
      this._items.forEach(iterator => (iterator.checked = checked));
    } else {
      this._items[index].checked = checked;

      if (this.all.checked) {
        this.all.checked = false;
      }
      this.all.checked = this._items.filter(i => i.id !== null).every(i => i.checked);
    }

    this.itemChange.emit(item);
  }

  toggleDropdown(): void {
    console.log('Dropdown toggled');
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
