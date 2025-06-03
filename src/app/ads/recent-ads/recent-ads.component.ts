import {Component, OnInit} from '@angular/core';
import {AdComponent} from "../ad/ad.component";
import {JsonPipe, NgForOf} from "@angular/common";
import {RecentAdsService} from "./recent-ads.service";
import {AdModel, Price} from "../ads-list/ads.model";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DropdownMultiSelectComponent} from "../../shared/dropdown-multi-select/dropdown-multi-select.component";
import {Item} from "../../shared/dropdown-multi-select/item";

@Component({
  selector: 'app-recent-ads',
  standalone: true,
  imports: [
    AdComponent,
    NgForOf,
    ReactiveFormsModule,
    DropdownMultiSelectComponent,
    JsonPipe,
  ],
  templateUrl: './recent-ads.component.html',
  styleUrl: './recent-ads.component.css'
})

export class RecentAdsComponent implements OnInit {
  ads: AdModel[] = [];
  filteredAds: AdModel[] = [];
  filterCriteria = {
    brands: [] as string[],
    models: [] as string[],
    fuels: [] as string[]
  };

// multiselect items
  items: Item[] = [];
  currentSelectedItem: Item | null = null;
  showSearch = true;
  showError = false;
  showAll = true;
  showStatus = true;
  placeholder: string = 'Select Brands';

  // mulstiselect form

  filterForm: FormGroup;

  constructor(private recentAdsService: RecentAdsService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      age: new FormControl(0),
      brands: new FormControl(''),
      models: new FormControl([]),
      fuels: new FormControl([])
    });

    this.placeholder = 'Select Brands';

    this.items = [
      {id: 1, name: 'Brand A', checked: false, visible : true},
      {id: 2, name: 'Brand B', checked: false, visible : true},
      {id: 3, name: 'Brand C', checked: false, visible : true}
    ];
  }

  ngOnInit(): void {
    this.getAds(0);

    // Listen for age changes and fetch new ads
    this.filterForm.get('age')?.valueChanges.subscribe((age) => {
      this.getAds(age);
    });
  }

  getAds(age: number): void {
    this.recentAdsService.getRecentAds(age).subscribe((ads) => {
      this.ads = ads;
      this.filteredAds = [...ads];

      // Populate filter criteria
      this.filterCriteria.brands = [...new Set(ads.map((ad) => ad.Brand))];
      this.filterCriteria.models = [...new Set(ads.map((ad) => ad.CarModel))];
      this.filterCriteria.fuels = [...new Set(ads.map((ad) => ad.Fuel))];
    });
  }

  onBrandChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedBrand = selectElement.value;
    this.filterCriteria.models = this.ads
      .filter((ad) => ad.Brand === selectedBrand)
      .map((ad) => ad.CarModel);
    this.filterForm.get('models')?.setValue([]);
  }

  applyFilters(): void {
    const selectedBrand = this.filterForm.get('brands')?.value;
    const selectedModels = this.filterForm.get('models')?.value;

    this.filteredAds = this.ads.filter((ad) => {
      const matchesBrand = !selectedBrand || ad.Brand === selectedBrand;
      const matchesModel = selectedModels.length === 0 || selectedModels.includes(ad.CarModel);
      return matchesBrand && matchesModel;
    });
  }

  // multiselect change handler

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


  // multiselect

}
