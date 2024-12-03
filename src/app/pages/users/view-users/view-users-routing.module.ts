import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUsersComponent } from './view-users.component';

const routes: Routes = [
  {
    path: '',
    component: ViewUsersComponent,
    data: { breadcrumb: 'View' },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewUsersRoutingModule { }
