import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import * as moment from 'moment';

import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'formly-field-daterangepicker',
  template: `
    <div class="form-group">
      <label *ngIf="to.label">{{ to.label }}</label>
      <input
        type="text"
        class="form-control"
        ngxDaterangepickerMd
        [showClearButton]="true"
        [showCancel]="true"
        [linkedCalendars]="false"
        [autoApply]="true"
        [locale]="{ format: 'YYYY-MM-DD' }"
        [placeholder]="to.placeholder || 'Select date range'"
        [formControl]="control"
      />
    </div>
  `
})
export class DateRangePickerTypeComponent extends FieldType {
  get control(): FormControl {
    return this.formControl as FormControl;
  }
}
