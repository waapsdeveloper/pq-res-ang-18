import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category.component';

const routes: Routes = [
  {
    path: '',
    component: AddCategoryComponent,
    data: { breadcrumb: 'add' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCategoryRoutingModule { }
