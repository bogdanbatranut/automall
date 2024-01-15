import { Component } from '@angular/core';
import {CriteriasService} from "../../criterias/criterias.service";
import {MarketsService} from "../../markets/markets.service";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe, NgFor} from "@angular/common";
import {MultiselectComponent} from "../../shared/multiselect/multiselect.component";
import {CriteriaModel} from "../../criterias/criterias.model";
import {forkJoin, map, Observable, tap} from "rxjs";
import {Market, MarketsModelResponse} from "../../markets/markets.models";
import {ScrapeService} from "../scrape.service";

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [
    JsonPipe,
    MultiselectComponent,
    ReactiveFormsModule,
    NgFor,
  ],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css'
})
export class SetupComponent {

  requests  = [
    this.marketsService.getMarkets().pipe(
      map( mkts => {
        console.log("mkts : ", mkts)
        return mkts
      })
    ),
    this.criteriasService.getCriterias().pipe(
      map( crts => {
        // console.log("crts : ", crts)
        return crts
      })
    )
  ]

  form : FormGroup = new FormGroup<any>({})

  get markets() {
    return this.form.get("markets") as FormArray
  }

  get criterias() {
    return this.form.get("criterias") as FormArray
  }

  getData() {
    console.log("???? ");
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
                      id: mkt.ID, selected: mkt.AllowProcess, label: mkt.Name
                    }
                  )
                )
          });
          crts.forEach(function(crt : CriteriaModel){
            self.criterias.push(
              new FormControl(
                {
                  id: crt.ID, selected: crt.AllowProcess, label: self.createCriteriasLabel(crt)
                }
              )
            )
          });

          self.form.valueChanges.subscribe(val => self.formValueChanged())
        }
      )
  }

  serverMarkets : Market[] = []
  serverCriterias : CriteriaModel[] = []

  constructor(
    private criteriasService : CriteriasService,
    private marketsService : MarketsService,
    private scrapeService : ScrapeService
  ) {
    this.form = new FormGroup({
      criterias: new FormArray([]),
      markets: new FormArray([])
    })

  }

  ngOnInit(){
    this.getData()
  }


  createCriteriasLabel(criteria : CriteriaModel) : string{
    return criteria.brand + " " + criteria.carModel + " from " + criteria.YearFrom + " to " +criteria.YearTo + " fuel: " + criteria.Fuel
  }

  formValueChanged(){
    this.scrapeService.activateScrapeMarketsAndCriterias(this.form.value).subscribe()
  }

}
