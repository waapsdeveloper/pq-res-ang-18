import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditExpenseCategoriesRoutingModule } from './edit-expense-categories-routing.module';
import { EditExpenseCategoriesComponent } from './edit-expense-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';

@NgModule({
  declarations: [EditExpenseCategoriesComponent],
  imports: [
    CommonModule,
    EditExpenseCategoriesRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class EditExpenseCategoriesModule {}
