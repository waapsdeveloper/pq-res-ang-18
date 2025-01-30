import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMessageComponent } from './list-message.component';

const routes: Routes = [
  {
    path: '',
    component: ListMessageComponent,
    data: { breadcrumb: 'list' }, // Root breadcrumb
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListMessageRoutingModule { }
