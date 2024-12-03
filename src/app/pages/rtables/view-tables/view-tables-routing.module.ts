import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTablesComponent } from './view-tables.component';

const routes: Routes = [
  {
    path: '',
    component: ViewTablesComponent,
    data: { breadcrumb: 'View' },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTablesRoutingModule { }
