import { Component } from '@angular/core';
import { MarketsService } from "../../markets/markets.service";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, JsonPipe, NgFor, NgIf} from "@angular/common";
import { MultiselectComponent } from "../../shared/multiselect/multiselect.component";
import {CriteriaModel, CriteriaSetupModel} from "../../criterias/criterias.model";
import { ScrapeService } from "../scrape.service";
import {MarketCriteriasSetupModel} from "../../markets/markets.models";

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [
    JsonPipe,
    MultiselectComponent,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})

export class SetupComponent {

  form: FormGroup;
  response = "";

  get markets(): FormArray {
    return this.form.get('markets') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private marketsService: MarketsService,
    private scrapeService: ScrapeService
  ) {
    this.form = this.fb.group({
      markets: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.getMarketsWithCriterias();
  }

  getMarketsWithCriterias() {
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
          criteriasArray.controls.forEach((crt) => {
            crt.get('checked')?.setValue(isChecked, { emitEvent: false });
          });
        });
      });
    });
  }

  getMarketsWithCriteriasOLD() {
    this.marketsService.getMarketsWithCriterias().subscribe((data) => {
      data.forEach((mkt) => {



        const criterias = this.fb.array(
          mkt.MarketCriterias.map((crt: MarketCriteriasSetupModel) =>
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

        // checkedControl.valueChanges.subscribe((isChecked: boolean) => {
        //   if (isChecked) {
        //     criteriasArray.controls.forEach(crt => {
        //       crt.value.checked = true;
        //     });
        //   } else {
        //     criteriasArray.controls.forEach(crt => {
        //       crt.value.checked = false;
        //     });
        //   }
        // });


        checkedControl.valueChanges.subscribe((isChecked: boolean) => {
          criteriasArray.controls.forEach((crt) => {
            crt.get('checked')?.setValue(isChecked, { emitEvent: false });
          });
        });

      });
    });
  }

  createCriteriasLabel(criteria: CriteriaSetupModel): string {
    return `${criteria.brand} ${criteria.carModel} from ${criteria.YearFrom} to ${criteria.YearTo} fuel: ${criteria.Fuel}`;
  }

  formValueChanged() {
    this.scrapeService.activateScrapeMarketsAndCriterias(this.form.value).subscribe(val => {
      this.response = val;
    });
  }

  getCriterias(mkt: AbstractControl): FormArray {
    return mkt.get('criterias') as FormArray;
  }

  getCheckedMkt(mkt: AbstractControl): FormControl {
    return mkt.get('checked') as FormControl;
  }

  protected readonly FormControl = FormControl;

  saveForm(): void {
    if (this.form.valid) {
      this.scrapeService.saveSetupFormData(this.form.value).subscribe(
        (response) => {
          this.response = "Form saved successfully!";
          console.log(response);
        },
        (error) => {
          console.error("Error saving form:", error);
          this.response = "Failed to save the form.";
        }
      );
    } else {
      this.response = "Form is invalid. Please check the inputs.";
    }
  }
}
