import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBranchConfigComponent } from './edit-branch-config.component';

const routes: Routes = [
  {
    path: '',
    component: EditBranchConfigComponent,
    data: { breadcrumb: 'edit' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditBranchConfigRoutingModule {}
