import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { permissionGuard } from 'src/app/guards/permission.guard';
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
        loadChildren: () => import('./list-user/list-user.module').then((m) => m.ListUserModule),
        data: {
          entity: 'user',
          action: 'list'
        },
        canActivate: [
          permissionGuard
        ], // Add your guards here if needed
      },
      {
        path: 'add',
        loadChildren: () => import('./add-user/add-user.module').then((m) => m.AddUserModule),
        data: {
          entity: 'user',
          action: 'add'
        },
        canActivate: [
          permissionGuard
        ],
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-user/view-user.module').then((m) => m.ViewUserModule),
        data: {
          entity: 'user',
          action: 'view'
        },
        canActivate: [
          permissionGuard
        ],
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-user/edit-user.module').then((m) => m.EditUserModule),
        data: {
          entity: 'user',
          action: 'edit'
        },
        canActivate: [
          permissionGuard
        ],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
