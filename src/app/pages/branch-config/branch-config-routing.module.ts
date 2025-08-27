import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchConfigComponent } from './branch-config.component';
// branch-config-routing.module.ts
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
        loadChildren: () => import('./edit-branch-config/edit-branch-config.module').then((m) => m.EditBranchConfigModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-branch-config/edit-branch-config.module').then((m) => m.EditBranchConfigModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchConfigRoutingModule {}
