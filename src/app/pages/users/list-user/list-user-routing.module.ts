import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './list-user.component';

const routes: Routes = [
  {
    path: '',
    component: ListUserComponent,
    data: { breadcrumb: 'list' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListUserRoutingModule { }
