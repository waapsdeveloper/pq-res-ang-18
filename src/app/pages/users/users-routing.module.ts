import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: { breadcrumb: 'User' },
    children: [
      {
        path: '',

        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-user/list-user.module').then((m) => m.ListUserModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./add-user/add-user.module').then((m) => m.AddUserModule)
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-user/view-user.module').then((m) => m.ViewUserModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
