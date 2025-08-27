import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRolesComponent } from './add-roles.component';

const routes: Routes = [
  {
    path: '',
    component: AddRolesComponent,
    data: { breadcrumb: 'Add' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRolesRoutingModule {}
