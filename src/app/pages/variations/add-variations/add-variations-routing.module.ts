import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVariationsComponent } from './add-variations.component';
const routes: Routes = [
  {
    path: '',
    component: AddVariationsComponent,
    data: { breadcrumb: 'Add' },
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddVariationsRoutingModule { }
