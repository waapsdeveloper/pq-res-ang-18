import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseComponent } from './expense.component';
import { FormsModule } from '@angular/forms';
import { BtopHeaderModule } from 'src/app/components/btop-header/btop-header.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ExpenseComponent],
  imports: [CommonModule, ExpenseRoutingModule, SharedModule, BtopHeaderModule, FormsModule]
})
export class ExpenseModule {}
