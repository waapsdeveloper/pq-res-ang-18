import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    data: { breadcrumb: 'Roles' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-roles/list-roles.module').then((m) => m.ListRolesModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./add-roles/add-roles.module').then((m) => m.AddRolesModule)
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-roles/view-roles.module').then((m) => m.ViewRolesModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-roles/edit-roles.module').then((m) => m.EditRolesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule {}
