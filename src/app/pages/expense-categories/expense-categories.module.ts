import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseCategoriesRoutingModule } from './expense-categories-routing.module';
import { ExpenseCategoriesComponent } from './expense-categories.component';
import { FormsModule } from '@angular/forms';
import { BtopHeaderModule } from 'src/app/components/btop-header/btop-header.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ExpenseCategoriesComponent],
  imports: [CommonModule, ExpenseCategoriesRoutingModule, SharedModule, BtopHeaderModule, FormsModule],
  exports: [ExpenseCategoriesComponent]
})
export class ExpenseCategoriesModule {}
