import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExpenseComponent } from './edit-expense.component';
const routes: Routes = [
  {
    path: '',
    component: EditExpenseComponent,
    data: { breadcrumb: 'edit' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditExpenseRoutingModule {}
