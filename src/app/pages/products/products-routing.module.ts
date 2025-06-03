import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { permissionGuard } from '../../guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    data: { breadcrumb: 'Product ' },
    children: [
      {
        path: '',

        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-product/list-product.module').then((m) => m.ListProductModule),
        data: { entity: 'product', action: 'view' },
        canActivate: [permissionGuard]
      },
      {
        path: 'add',
        loadChildren: () => import('./add-product/add-product.module').then((m) => m.AddProductModule),
        data: { entity: 'product', action: 'add' },
        canActivate: [permissionGuard]
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-products/view-products.module').then((m) => m.ViewProductsModule),
        data: { entity: 'product', action: 'view' },
        canActivate: [permissionGuard]
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-product/edit-product.module').then((m) => m.EditProductModule),
        data: { entity: 'product', action: 'edit' },
        canActivate: [permissionGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
