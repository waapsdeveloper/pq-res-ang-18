import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRtablesComponent } from './add-rtables.component';

const routes: Routes = [
  {
    path: '',
    component: AddRtablesComponent,
    data: { breadcrumb: 'Add' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRtablesRoutingModule { }
