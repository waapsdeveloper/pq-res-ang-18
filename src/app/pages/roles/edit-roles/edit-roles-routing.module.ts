import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRolesComponent } from './edit-roles.component';

const routes: Routes = [
  {
    path: '',
    component: EditRolesComponent,
    data: { breadcrumb: 'Edit' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRolesRoutingModule {}
