import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe, NgFor} from "@angular/common";
import {SelectDropdownComponent} from "../../shared/select-dropdown/select-dropdown.component";
import {CriteriasService} from "../../criterias/criterias.service";
import {tap} from "rxjs";
import {MarketsService} from "../../markets/markets.service";
import {MultiselectComponent} from "../../shared/multiselect/multiselect.component";
import {SliderComponent} from "../../shared/slider/slider.component";
import {AdsListComponent} from "../../ads/ads-list/ads-list.component";

@Component({
  selector: 'app-ads-filter',
  standalone: true,
  imports: [
    JsonPipe,
    SelectDropdownComponent,
    ReactiveFormsModule,
    MultiselectComponent,
    NgFor,
    SliderComponent,
    AdsListComponent
  ],
  templateUrl: './ads-filter.component.html',
  styleUrl: './ads-filter.component.css'
})
export class AdsFilterComponent {

  form : FormGroup<any>
  criterias : {id : number, label : string}[]
  selectedCriteriasLabel : string = ""

  get markets() {
    return this.form.get("marketsFilter")!.get("markets") as FormArray
  }

  get years() {
    return this.form.get("yearsFilter")!.get("years") as FormArray
  }

  get marketsFilter() {
    return this.form.get("marketsFilter") as FormGroup
  }

  get yearsFilter() {
    return this.form.get("yearsFilter") as FormGroup
  }

  minPriceLabel : string = "Min Price:"
  maxPriceLabel : string = "Max Price:"

  constructor(
    private criteriasService : CriteriasService,
    private marketsService : MarketsService
    ) {

    this.form = this.buildForm()
    this.criterias = [{id : 0 , label : ""}]
    this.criteriasService.getCriterias().subscribe(
      value => {
        value.map(cr => {
          this.criterias.push({id : cr.ID, label : cr.brand + " " + cr.carModel + " " + cr.YearFrom + "-" + cr.YearTo +  " " + cr.Fuel})
        })
      }
    )

    this.marketsService.getMarkets().subscribe(
      value => {
        value.map(mkt => {
          this.markets.push(
            new FormControl({
              id : mkt.ID, selected : false, label : mkt.Name
            })
          )
        })
      }
    )



    this.form.valueChanges.subscribe((value) => {
    })
  }

  buildYearsArray() : FormArray {
    let years = [2019,2020,2021,2022,2023,2024]
    let yrs = new FormArray<any>([])
    years.forEach((y) => {
      let yControl = new FormControl({
        id : y, checked : true, label : y
      })
      yrs.push(yControl)
    })
    return yrs
  }

  buildForm() : FormGroup {
    let form = new FormGroup({
      criteria : new FormControl<{selected : number, label : string}>({selected : 0, label : ""}),
      marketsFilter : new FormGroup({
        markets : new FormArray([
        ])
      }),
      yearsFilter : new FormGroup({
        years : this.buildYearsArray()
      }),
      priceLimits : new FormGroup({
        minPrice : new FormControl<{value : number}>({value : 0}),
        maxPrice : new FormControl<{value : number}>({value : 50000}),
      }),
      sorting : new FormGroup({
        sortOption : new FormControl('byPrice'),
        sortDirection : new FormControl('asc')
      }),
      grouping : new FormGroup({
        groupOption : new FormControl('discounted')
      }),
      page: new FormControl(1),
      limit: new FormControl(50)

    })
    return  form
  }

  pageSelected(page : number){
    let oldSelectedPage = this.form.get("page")?.value
    if (page != oldSelectedPage){
      this.form.get("page")?.patchValue(page)
    }
  }

}
