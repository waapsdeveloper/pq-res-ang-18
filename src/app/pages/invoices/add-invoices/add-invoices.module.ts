import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KtAppFormPageComponent } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.component';
import { AddInvoicesRoutingModule } from './add-invoices-routing.module';
import { AddInvoicesComponent } from './add-invoices.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';


@NgModule({
  declarations: [
    AddInvoicesComponent
  ],
  imports: [
    CommonModule,
    AddInvoicesRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule,
  ]
})
export class AddInvoicesModule { }
