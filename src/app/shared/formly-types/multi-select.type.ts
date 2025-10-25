import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { Observable, isObservable, of } from 'rxjs';

@Component({
  selector: 'formly-multi-select-type',
  template: `
    <label class="form-label fw-semibold">{{ to.label }}</label>
    <ng-select
      [items]="options$ | async"
      bindLabel="label"
      bindValue="value"
      [multiple]="to['multiple'] || true"
      [searchable]="to['searchable'] !== false"
      [placeholder]="to.placeholder || 'Select options'"
      [formControl]="control"
      [formlyAttributes]="field"
      class="w-100"
    ></ng-select>
  `,
  styles: [
    `
      .ng-select {
        width: 100%;
        font-size: 14px;
      }
      .ng-select .ng-select-container {
        border: 1px solid #ced4da;
        border-radius: 6px;
        background-color: #fff;
        min-height: 38px;
        box-shadow: none !important;
        transition: border-color 0.15s ease-in-out;
      }
      .ng-select .ng-select-container:hover {
        border-color: #86b7fe;
      }
      .ng-select .ng-value {
        background-color: #f8f9fa;
        border-radius: 4px;
        padding: 2px 6px;
        margin: 2px;
        font-size: 13px;
      }
      .ng-select .ng-arrow-wrapper {
        color: #6c757d;
      }
    `
  ]
})
export class MultiSelectTypeComponent extends FieldType implements OnInit {
  get control(): FormControl {
    return this.formControl as FormControl;
  }
  options$!: Observable<any[]>;

  ngOnInit(): void {
    const options = this.to.options;
    if (isObservable(options)) {
      this.options$ = options;
    } else {
      this.options$ = of(options || []);
    }
  }
}
