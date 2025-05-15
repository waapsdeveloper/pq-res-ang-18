import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddExpenseCategoriesRoutingModule } from './add-expense-categories-routing.module';
import { AddExpenseCategoriesComponent } from './add-expense-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';

@NgModule({
  declarations: [AddExpenseCategoriesComponent],
  imports: [
    CommonModule,
    AddExpenseCategoriesRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class AddExpenseCategoriesModule {}
