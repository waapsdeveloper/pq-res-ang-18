import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchConfigComponent } from './branch-config.component';
import { permissionGuard } from '../../guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: BranchConfigComponent,
    data: { breadcrumb: 'Branch Config' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'active-branch',
      },
      {
        path: 'active-branch',
        loadChildren: () => import('./edit-branch-config/edit-branch-config.module').then((m) => m.EditBranchConfigModule),
        data: { entity: 'branch', action: 'view' },
        canActivate: [permissionGuard]
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-branch-config/edit-branch-config.module').then((m) => m.EditBranchConfigModule),
        data: { entity: 'branch', action: 'edit' },
        canActivate: [permissionGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchConfigRoutingModule {}
