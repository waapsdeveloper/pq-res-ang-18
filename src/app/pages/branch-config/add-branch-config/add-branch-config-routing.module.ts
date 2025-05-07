import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBranchConfigComponent } from './add-branch-config.component';

const routes: Routes = [
  {
    path: '',
    component: AddBranchConfigComponent,
    data: { breadcrumb: 'add' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBranchConfigRoutingModule {}
