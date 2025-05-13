import { Component } from '@angular/core';
import {CriteriasService} from "../../criterias/criterias.service";
import {MarketsService} from "../../markets/markets.service";
import {ScrapeStarterServiceService} from "./scrape-starter-service.service";
import {ScrapeStartComponent} from "../scrape-start/scrape-start.component";
import {MultiselectComponent} from "../../shared/multiselect/multiselect.component";
import {JsonPipe, NgForOf} from "@angular/common";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {forkJoin, map} from "rxjs";
import {Market, MarketCriteriasSetupModel} from "../../markets/markets.models";
import {CriteriaModel, CriteriaSetupModel} from "../../criterias/criterias.model";
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

  form : FormGroup ;
  criterias : any[] = []

  get markets() {
    return this.form.get("markets") as FormArray
  }

  // get criterias() {
  //   return this.criterias
  // }



  constructor(
    private criteriasService: CriteriasService,
    private marketsService: MarketsService,
    private starterService : ScrapeStarterServiceService,
    private fb: FormBuilder,
  ) {

    this.form = this.fb.group({
      markets: this.fb.array([]),
    });

  }


  getMarketsWithCriterias() {
    this.marketsService.getMarketsWithCriterias().subscribe((data) => {
      const criteriaMap = new Map<string, any>();

      data.forEach((mkt) => {
        const sortedCriterias = mkt.MarketCriterias.sort((a, b) => {
          const labelA = this.createCriteriasLabel(a.Criteria).toLowerCase();
          const labelB = this.createCriteriasLabel(b.Criteria).toLowerCase();
          return labelA.localeCompare(labelB);
        });

        const criterias = this.fb.array(
          sortedCriterias.map((crt: MarketCriteriasSetupModel) => {
            const label = this.createCriteriasLabel(crt.Criteria);
            if (!criteriaMap.has(label)) {
              criteriaMap.set(label, {
                label,
                checked: this.fb.control(false),
                markets: [],
              });
            }
            criteriaMap.get(label).markets.push({
              label: mkt.Name,
              checked: this.fb.control(false),
            });

            return this.fb.group({
              id: crt.Criteria.ID,
              checked: false,
              label,
            });
          })
        );

        this.markets.push(
          this.fb.group({
            id: [mkt.ID],
            checked: [false],
            label: [mkt.Name],
            criterias: criterias,
          })
        );
      });

      this.criterias = Array.from(criteriaMap.values());
    });
  }

  getMarketsWithCriteriasOLD() {
    this.marketsService.getMarketsWithCriterias().subscribe((data) => {
      data.forEach((mkt) => {
        const sortedCriterias = mkt.MarketCriterias.sort((a, b) => {
          const labelA = this.createCriteriasLabel(a.Criteria).toLowerCase();
          const labelB = this.createCriteriasLabel(b.Criteria).toLowerCase();
          return labelA.localeCompare(labelB);
        });


        const criterias = this.fb.array(
          sortedCriterias.map((crt: MarketCriteriasSetupModel) =>
            {
              let gr = this.fb.group({
                id: crt.Criteria.ID,
                checked: crt.AllowScraping,
                label: this.createCriteriasLabel(crt.Criteria),
              })
              return gr;
            }

          )
        );
        this.markets.push(
          this.fb.group({
            id: [mkt.ID],
            checked: [mkt.AllowProcess],
            label: [mkt.Name],
            criterias: criterias,
          })
        );
      });

      // Process marketsControls after they are populated
      this.markets.controls.forEach((marketGroup: AbstractControl) => {
        const checkedControl = marketGroup.get('checked') as FormControl;
        const criteriasArray = marketGroup.get('criterias') as FormArray;

        checkedControl.valueChanges.subscribe((isChecked: boolean) => {
          console.log("ddd", isChecked)
            criteriasArray.controls.forEach((crt) => {
              // if (this.allowCheckUncheckAll(criteriasArray)) {
              crt.get('checked')?.setValue(isChecked, { emitEvent: false });
              // }
            });
        });

      });
    });
  }

  ngOnInit() {
    this.getMarketsWithCriterias();

    // Listen for changes in criteria checkboxes and update market checkbox
    this.markets.valueChanges.subscribe(() => {
      this.markets.controls.forEach((marketGroup: AbstractControl) => {
        const criteriasArray = marketGroup.get('criterias') as FormArray;
        const marketCheckedControl = marketGroup.get('checked') as FormControl;

        const isAnyCriteriaChecked = criteriasArray.controls.some(
          (criteriaGroup: AbstractControl) => criteriaGroup.get('checked')?.value
        );

        if (marketCheckedControl.value !== isAnyCriteriaChecked) {
          marketCheckedControl.setValue(isAnyCriteriaChecked, { emitEvent: false });
          marketCheckedControl.updateValueAndValidity();
        }
      });
    });
  }


  createCriteriasLabel(criteria: CriteriaSetupModel): string {
    return `${criteria.brand} ${criteria.carModel} from ${criteria.YearFrom} to ${criteria.YearTo} fuel: ${criteria.Fuel}`;
  }

  getCriterias(mkt: AbstractControl): FormArray {
    return mkt.get('criterias') as FormArray;
  }

  getFormControl(control: AbstractControl | null): FormControl {
    return control as FormControl;
  }

  scrapeSelectedMarkets() {
    console.log("scrapeSelectedMarkets", this.form.value)
    this.starterService.startScraping(this.form.value)
  }

  protected readonly FormControl = FormControl;
}
