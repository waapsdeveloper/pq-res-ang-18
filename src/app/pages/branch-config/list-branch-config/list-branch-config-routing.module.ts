import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBranchConfigComponent } from './list-branch-config.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ListBranchConfigComponent,
  //   data: { breadcrumb: 'list' }
  // }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListBranchConfigRoutingModule {}
