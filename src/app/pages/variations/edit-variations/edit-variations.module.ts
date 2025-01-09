import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditVariationsRoutingModule } from './edit-variations-routing.module';
import { EditVariationsComponent } from './edit-variations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';
import { RepeatTypeComponent } from './repeat-type.component';
@NgModule({
  declarations: [EditVariationsComponent,RepeatTypeComponent],
  imports: [
    CommonModule,
    EditVariationsRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule,
    FormlyModule.forRoot({
      types: [
        { name: 'repeat', component: RepeatTypeComponent } // Register the repeat type
      ]
    })

  ]
})
export class EditVariationsModule {}
