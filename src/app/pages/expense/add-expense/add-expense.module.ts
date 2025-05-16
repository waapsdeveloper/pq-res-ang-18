import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddExpenseRoutingModule } from './add-expense-routing.module';
import { AddExpenseComponent } from './add-expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';

@NgModule({
  declarations: [AddExpenseComponent],
  imports: [
    CommonModule,
    AddExpenseRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class AddExpenseModule {}
