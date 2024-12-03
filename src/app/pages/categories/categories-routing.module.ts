import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    data: { breadcrumb: 'Category ' },
    children: [
      {
        path: '',

        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-category/list-category.module').then((m) => m.ListCategoryModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./add-category/add-category.module').then((m) => m.AddCategoryModule)
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-categories/view-categories.module').then((m) => m.ViewCategoriesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
