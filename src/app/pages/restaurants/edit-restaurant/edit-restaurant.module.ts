import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRestaurantRoutingModule } from './edit-restaurant-routing.module';
import { EditRestaurantComponent } from './edit-restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KtAppToolbarModule } from 'src/app/components/kt-app-toolbar/kt-app-toolbar.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { TimingSettingsComponent } from './timing-settings/timing-settings.component';
import { OrderSettingsComponent } from './order-settings/order-settings.component';
import { AttributesComponent } from './attributes/attributes.component';
import { InvoiceSettingsComponent } from './invoice-settings/invoice-settings.component';

@NgModule({
  declarations: [EditRestaurantComponent, GeneralSettingsComponent, TimingSettingsComponent, OrderSettingsComponent, AttributesComponent, InvoiceSettingsComponent],
  imports: [
    CommonModule,
    EditRestaurantRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class EditRestaurantModule {}
