import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRtablesComponent } from './edit-rtables.component';

const routes: Routes = [
  {
    path: '',
    component: EditRtablesComponent,
    data: { breadcrumb: 'Edit' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRtablesRoutingModule {}
