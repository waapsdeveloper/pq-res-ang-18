import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditExpenseRoutingModule } from './edit-expense-routing.module';
import { EditExpenseComponent } from './edit-expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';

@NgModule({
  declarations: [EditExpenseComponent],
  imports: [
    CommonModule,
    EditExpenseRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class EditExpenseModule {}
