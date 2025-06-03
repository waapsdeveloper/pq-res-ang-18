import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RtablesComponent } from './rtables.component';
import { permissionGuard } from '../../guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: RtablesComponent,
    data: { breadcrumb: 'Table' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-rtables/list-rtables.module').then((m) => m.ListRtablesModule),
        data: { entity: 'table', action: 'view' },
        canActivate: [permissionGuard]
      },
      {
        path: 'add',
        loadChildren: () => import('./add-rtables/add-rtables.module').then((m) => m.AddRtablesModule),
        data: { entity: 'table', action: 'add' },
        canActivate: [permissionGuard]
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-tables/view-tables.module').then((m) => m.ViewTablesModule),
        data: { entity: 'table', action: 'view' },
        canActivate: [permissionGuard]
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-rtables/edit-rtables.module').then((m) => m.EditRtablesModule),
        data: { entity: 'table', action: 'edit' },
        canActivate: [permissionGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RtablesRoutingModule { }
