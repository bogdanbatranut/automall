import {Component, Input, OnInit} from '@angular/core';
import {AppService} from "../../../app.service";
import {Item} from "../../dropdown-multi-select/item";
import {MultiDropdownComponent} from "../multi-dropdown/multi-dropdown.component";
import {JsonPipe} from "@angular/common";
import {DropdownComponent} from "../../../test/dropdown/dropdown.component";
import {RecentAdsService} from "../../../ads/recent-ads/recent-ads.service";
import {AdModel} from "../../../ads/ads-list/ads.model";

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [
    MultiDropdownComponent,
    JsonPipe,
    DropdownComponent
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css'
})
export class MultiSelectComponent implements OnInit {

  @Input() ads : AdModel[] = [];
  items: Item[] = [];
  // @ts-ignore
  currentSelectedItem: Item | null = null;
  showSearch = true;
  showError = false;
  showAll = true;
  showStatus = true;

  constructor(private appService: AppService, private recentAdsService: RecentAdsService) { }

  get checkedItems(): Item[] {
    return this.items.filter(i => i.checked);
  }

  getAds(age: number): void {
    this.recentAdsService.getRecentAds(age).subscribe((ads) => {
      this.ads = ads;

      const uniqueItemsMap = new Map<string, Item>();
      // Populate filter criteria

      ads.forEach((ad: AdModel) => {
        uniqueItemsMap.set(ad.Brand, { uuid: ad.Brand, name: ad.Brand } as Item);
      });
      this.items = Array.from(uniqueItemsMap.values());

      // this.items = [...new Set(ads.map((ad : AdModel) =>
      //   (
      //     {
      //       id: ad.ID,
      //       name: ad.Brand,
      //     } as Item
      //   )
      //
      //
      // ))];
    });
  }

  ngOnInit(): void {
    this.getAds(0)

    this.items = this.appService.getFoods().map(fruit => ({
      id: fruit.id,
      name: fruit.name
    } as Item));
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
