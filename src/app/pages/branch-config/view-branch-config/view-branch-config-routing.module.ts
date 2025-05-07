import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBranchConfigComponent } from './view-branch-config.component';

const routes: Routes = [
  {
    path: '',
    component: ViewBranchConfigComponent,
    data: { breadcrumb: 'view' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewBranchConfigRoutingModule {}
