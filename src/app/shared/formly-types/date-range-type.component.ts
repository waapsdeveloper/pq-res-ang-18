import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import * as moment from 'moment';

import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'formly-field-daterangepicker',
  template: `
    <div class="form-group date-range-container">
      <label *ngIf="to.label">{{ to.label }}</label>
      <input
        type="text"
        class="form-control"
        ngxDaterangepickerMd
        [showClearButton]="true"
        [showCancel]="true"
        [linkedCalendars]="true"
        [autoApply]="true"
        [locale]="{ format: 'YYYY-MM-DD' }"
        [alwaysShowCalendars]="true"
        [placeholder]="to.placeholder || 'Select date range'"
        [formControl]="control"
      />
    </div>
  `,
  styles: [
    `
      /* ensure host container doesn't clip the absolute picker */
      .date-range-container {
        position: relative;
       overflow:visible;
       z-index: 1100; /* keep above normal content */
      }

      input {
        cursor: pointer;
        z-index: 1300; /* keep input above normal content */
      }

      /* ensure the daterangepicker popup sits above table headers and other UI */
      ::ng-deep .daterangepicker {
        position: absolute !important;
        z-index: 99999 !important; /* must be higher than sticky headers */
        min-width: 640px !important;
        background: #fff !important;
        border: 1px solid #e6e6e6 !important;
        border-radius: 4px !important;
        box-shadow: 0 6px 20px rgba(0,0,0,0.15) !important;
        display: flex !important;
        flex-direction: row !important; /* side-by-side calendars */
        padding: 6px !important;
      }

      /* each calendar column */
      ::ng-deep .daterangepicker .drp-calendar {
        display: inline-block !important;
        width: 300px !important;
        margin: 0 !important;
        padding: 6px !important;
        background: transparent !important;
      }

      ::ng-deep .daterangepicker .drp-calendar.left {
        border-right: 1px solid #eee !important;
        margin-right: 8px !important;
      }

      ::ng-deep .daterangepicker .drp-calendar.right {
        margin-left: 8px !important;
      }

      /* remove the small arrow so it doesn't get clipped */
      ::ng-deep .daterangepicker:before,
      ::ng-deep .daterangepicker:after {
        display: none !important;
      }

      /* ensure calendar cells remain visible */
      ::ng-deep .daterangepicker td,
      ::ng-deep .daterangepicker th {
        z-index: 100000 !important;
      }
    `
  ]
})
export class DateRangePickerTypeComponent extends FieldType {
  get control(): FormControl {
    return this.formControl as FormControl;
  }
}
