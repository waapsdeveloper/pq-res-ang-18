import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoryComponent } from './list-category.component';

const routes: Routes = [
  {
    path: '',
    component: ListCategoryComponent,
    data: { breadcrumb: 'list' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCategoryRoutingModule { }
