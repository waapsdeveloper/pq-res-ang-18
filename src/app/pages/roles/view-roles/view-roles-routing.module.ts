import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRolesComponent } from './view-roles.component';

const routes: Routes = [
  {
    path: '',
    component: ViewRolesComponent,
    data: { breadcrumb: 'Edit' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRolesRoutingModule {}
