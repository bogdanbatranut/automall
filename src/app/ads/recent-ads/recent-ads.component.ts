import {Component, OnInit} from '@angular/core';
import {AdComponent} from "../ad/ad.component";
import {NgForOf} from "@angular/common";
import {RecentAdsService} from "./recent-ads.service";
import {AdModel, Price} from "../ads-list/ads.model";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-recent-ads',
  standalone: true,
    imports: [
        AdComponent,
        NgForOf,
        ReactiveFormsModule,
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
  selectedFilters = {
    brand: new Set<string>(),
    model: new Set<string>(),
    fuel: new Set<string>(),
    price: 40000 as number
  };

  filterForm: FormGroup;

  constructor(private recentAdsService: RecentAdsService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      age: new FormControl(0),
      price: new FormControl(40000),
      brands: new FormControl([]),
      models: new FormControl([]),
      fuels: new FormControl([])
    });
  }

  ngOnInit(): void {
    this.getAds(0);

    // Listen for age changes and fetch new ads
    this.filterForm.get('age')?.valueChanges.subscribe((age) => {
      this.getAds(age);
    });

    // Listen for price changes and apply filters
    this.filterForm.get('price')?.valueChanges.subscribe((price) => {
      this.selectedFilters.price = price;
      this.applyFilters();
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

  onFilterChange(type: 'brand' | 'model' | 'fuel', value: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedFilters[type].add(value);
    } else {
      this.selectedFilters[type].delete(value);
    }
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredAds = this.ads.filter((ad) => {
      const matchesBrand = this.selectedFilters.brand.size === 0 || this.selectedFilters.brand.has(ad.Brand);
      const matchesModel = this.selectedFilters.model.size === 0 || this.selectedFilters.model.has(ad.CarModel);
      const matchesFuel = this.selectedFilters.fuel.size === 0 || this.selectedFilters.fuel.has(ad.Fuel);
      const matchesPrice = ad.Prices.length > 0 && ad.Prices[ad.Prices.length - 1].Price <= this.selectedFilters.price;
      return matchesBrand && matchesModel && matchesFuel && matchesPrice;
    });
  }
}
