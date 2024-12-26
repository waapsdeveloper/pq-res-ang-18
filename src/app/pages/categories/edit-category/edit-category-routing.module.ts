import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCategoryComponent } from './edit-category.component';

const routes: Routes = [
  {
      path: '',
      component: EditCategoryComponent,
      data: { breadcrumb: 'edit' }, // Root breadcrumb
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCategoryRoutingModule { }
