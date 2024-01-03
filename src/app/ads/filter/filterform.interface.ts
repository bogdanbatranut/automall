import {FormControl} from "@angular/forms";

export interface FilterForm {
  sortOption : FormControl<string>
  sortOptionDirection : FormControl<string>
  market : FormControl<string>
}
