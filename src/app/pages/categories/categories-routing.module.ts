import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { permissionGuard } from '../../guards/permission.guard'; // <-- Import the guard

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
        loadChildren: () => import('./list-category/list-category.module').then((m) => m.ListCategoryModule),
        data: { entity: 'category', action: 'view' },
        canActivate: [permissionGuard]
      },
      {
        path: 'add',
        loadChildren: () => import('./add-category/add-category.module').then((m) => m.AddCategoryModule),
        data: { entity: 'category', action: 'add' },
        canActivate: [permissionGuard]
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-categories/view-categories.module').then((m) => m.ViewCategoriesModule),
        data: { entity: 'category', action: 'view' },
        canActivate: [permissionGuard]
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-category/edit-category.module').then((m) => m.EditCategoryModule),
        data: { entity: 'category', action: 'edit' },
        canActivate: [permissionGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
