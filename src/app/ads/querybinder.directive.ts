import {Directive, Input} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[appQuerybinder]',
  standalone: true
})
export class QuerybinderDirective {

  @Input('bindQueryParam') paramKey: string;

  constructor(private ngControl: NgControl) {}

  ngOnInit() {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.has(this.paramKey)) {
      this.ngControl.control?.patchValue(queryParams.get(this.paramKey));
    }
  }

}
