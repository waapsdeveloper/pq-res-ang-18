import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRtablesComponent } from './list-rtables.component';

const routes: Routes = [
  {
    path: '',
    component: ListRtablesComponent,
    data: { breadcrumb: 'list' }, // Root breadcrumb
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRtablesRoutingModule { }
