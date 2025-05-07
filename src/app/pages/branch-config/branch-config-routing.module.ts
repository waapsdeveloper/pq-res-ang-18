import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchConfigComponent } from './branch-config.component';
const routes: Routes = [
  {
    path: '',
    component: BranchConfigComponent,
    data: { breadcrumb: 'Branch Config' },
    children: [
      {
        path: '',

        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-branch-config/list-branch-config.module').then((m) => m.ListBranchConfigModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./add-branch-config/add-branch-config.module').then((m) => m.AddBranchConfigModule)
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-branch-config/view-branch-config.module').then((m) => m.ViewBranchConfigModule)
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
