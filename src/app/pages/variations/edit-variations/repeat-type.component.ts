import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <div *ngFor="let field of field.fieldGroup; let i = index;" class="row mb-3">
      <formly-field [field]="field" class="col-md-6 col-12"></formly-field>
      <div class="col-md-6 col-12 text-end">
        <button
          type="button"
          class="btn btn-danger btn-sm mt-4"
          (click)="remove(i)">
          Remove
        </button>
      </div>
    </div>
    <div class="text-end">
      <button
        type="button"
        class="btn btn-primary btn-sm"
        (click)="add()">
        Add Option
      </button>
    </div>
  `
})
export class RepeatTypeComponent extends FieldArrayType {}
