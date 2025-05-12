import { Component } from '@angular/core';
import {CriteriasService} from "../../criterias/criterias.service";
import {MarketsService} from "../../markets/markets.service";
import {ScrapeStarterServiceService} from "./scrape-starter-service.service";
import {ScrapeStartComponent} from "../scrape-start/scrape-start.component";
import {MultiselectComponent} from "../../shared/multiselect/multiselect.component";
import {JsonPipe, NgForOf} from "@angular/common";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {forkJoin, map} from "rxjs";
import {Market} from "../../markets/markets.models";
import {CriteriaModel} from "../../criterias/criterias.model";
import {SingleSelectComponent} from "../../shared/single-select/single-select.component";

@Component({
  selector: 'app-scrape-starter',
  standalone: true,
  imports: [
    ScrapeStartComponent,
    MultiselectComponent,
    SingleSelectComponent,
    NgForOf,
    ReactiveFormsModule,
    SingleSelectComponent,
    JsonPipe
  ],
  templateUrl: './scrape-starter.component.html',
  styleUrl: './scrape-starter.component.css'
})
export class ScrapeStarterComponent {

  form : FormGroup = new FormGroup<any>({})
  criteriasRaw : any[]  = []


  get markets() {
    return this.form.get("markets") as FormArray
  }

  get criterias() {
    return this.form.get("criterias") as FormArray
  }



  requests  = [
    this.marketsService.getMarkets().pipe(
      map( mkts => {
        return mkts
      })
    ),
    this.criteriasService.getCriterias().pipe(
      map( crts => {
        return crts
      })
    )
  ]


  constructor(
    private criteriasService: CriteriasService,
    private marketsService: MarketsService,
    private starterService : ScrapeStarterServiceService
  ) {

    this.form = new FormGroup({
      criterias: new FormArray([]),
      markets: new FormArray([])
    })

  }

  getData() {
    const self = this;
    forkJoin(this.requests)
      .pipe(
        map(value => {
          return value as Array<any>
        })
      )
      .subscribe(
        ([mkts, crts]) =>
        {
          mkts.forEach(function(mkt : Market){
            self.markets.push(
              new FormControl(
                {
                  id: mkt.ID, checked: mkt.AllowProcess, label: mkt.Name
                }
              )
            )
          });
          crts.forEach(function(crt : CriteriaModel){

            self.criteriasRaw.push(
              {id : crt.ID, label: self.createCriteriasLabel(crt)}
            );

            self.criterias.push(
              new FormControl(
                {
                  id: crt.ID, checked: crt.AllowProcess, label: self.createCriteriasLabel(crt)
                }
              )
            )
          });

          self.form.valueChanges.subscribe(val => self.formValueChanged())
        }
      )
  }


  ngOnInit(){
    this.getData()
  }


  createCriteriasLabel(criteria : CriteriaModel) : string{
    return criteria.brand + " " + criteria.carModel + " from " + criteria.YearFrom + " to " +criteria.YearTo + " fuel: " + criteria.Fuel
  }

  formValueChanged(){
    // this.scrapeService.activateScrapeMarketsAndCriterias(this.form.value).subscribe(val => {this.response = val})
  }

  protected readonly FormControl = FormControl;

  get marketControls(): FormControl[] {
    return (this.form.get('markets') as FormArray).controls as FormControl[];
  }

  get criteriaControls(): FormControl[] {
    return (this.form.get('criterias') as FormArray).controls as FormControl[];
  }
}
