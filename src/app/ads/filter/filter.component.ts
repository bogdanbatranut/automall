import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {map, Observable, pipe, tap} from "rxjs";
import {AdsService} from "../ads.service";
import {CheckedIdentifiable} from "./identifiable.model";
import {CriteriaModel} from "../../criterias/criterias.model";
import {CriteriasService} from "../../criterias/criterias.service";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {AsyncPipe, JsonPipe, NgFor} from "@angular/common";
import {MarketsService} from "../../markets/markets.service";
import {mark} from "@angular/compiler-cli/src/ngtsc/perf/src/clock";
import {
  IdentifiableCheckButtonComponent
} from "../../shared/identifiable-check-button/identifiable-check-button.component";
import {AdsListComponent} from "../ads-list/ads-list.component";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    NgFor,
    JsonPipe,
    IdentifiableCheckButtonComponent,
    AdsListComponent
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit{

  criterias : Observable<CriteriaModel[]>
  markets : Observable<any>

  multiFilterArr = this.formBuilder.array([])


  filterForm = this.formBuilder.group({
    criteriaId : new FormControl(0),
    sortOption : ["byPrice", [Validators.required]],
    sortOptionDirection : ["asc", [Validators.required]],
    filters : this.multiFilterArr,
    limitLow : new FormControl(null),
    limitHigh : new FormControl(null),
    page : new FormControl(1),
    limit : new FormControl(50)
    }
  )

  // filterForm : FormGroup<FilterForm>

  constructor(
    private formBuilder: FormBuilder,
    private adsService : AdsService,
    private criteriasService : CriteriasService,
    private marketsService : MarketsService,
    private router : Router
    ) {


    this.markets = this.marketsService.getMarkets().pipe(
      map(markets => {
        markets.map(
          market =>  (<FormArray>this.filterForm.get("filters")).push(new FormGroup({
            checked : new FormControl(false),
            id : new FormControl( market.ID )
          }))
       );
        return markets
      })
    )

    this.criterias = this.criteriasService.getCriterias()
  }

  shareCheckedList(item:any[]){
  }
  shareIndividualCheckedList(item:{}){
  }

  criteriaChanged(val : number){
    this.filterForm.get("criteriaId")?.setValue(val)
  }

  ngOnInit(): void {

  }
}
