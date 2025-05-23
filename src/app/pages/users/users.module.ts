import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { BtopHeaderModule } from 'src/app/components/btop-header/btop-header.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyTypesModule } from 'src/app/shared/formly-types/formly-types.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule, BtopHeaderModule, FormsModule, FormlyTypesModule]
})
export class UsersModule {}
