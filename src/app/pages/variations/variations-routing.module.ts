import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VariationsComponent } from './variations.component';
import { permissionGuard } from '../../guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: VariationsComponent,
    data: { breadcrumb: 'Variation' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-variations/list-variations.module').then((m) => m.ListVariationsModule),
        data: { entity: 'variation', action: 'list' },
        canActivate: [permissionGuard]
      },
      {
        path: 'add',
        loadChildren: () => import('./add-variations/add-variations.module').then((m) => m.AddVariationsModule),
        data: { entity: 'variation', action: 'add' },
        canActivate: [permissionGuard]
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-variations/view-variations.module').then((m) => m.ViewVariationsModule),
        data: { entity: 'variation', action: 'view' },
        canActivate: [permissionGuard]
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-variations/edit-variations.module').then((m) => m.EditVariationsModule),
        data: { entity: 'variation', action: 'edit' },
        canActivate: [permissionGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariationsRoutingModule {}
