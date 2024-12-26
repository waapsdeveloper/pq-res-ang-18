import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCategoryComponent } from '../../categories/edit-category/edit-category.component';

const routes: Routes = [
  {
      path: '',
      component: EditCategoryComponent,
      data: { breadcrumb: 'Edit' },
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditOrderRoutingModule { }
