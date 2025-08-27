import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRolesComponent } from './list-roles.component';

const routes: Routes = [
  {
    path: '',
    component: ListRolesComponent,
    data: { breadcrumb: 'List' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRolesRoutingModule {}
