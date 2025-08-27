import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

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
        loadChildren: () => import('./list-product/list-product.module').then((m) => m.ListProductModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./add-product/add-product.module').then((m) => m.AddProductModule)
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-products/view-products.module').then((m) => m.ViewProductsModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-product/edit-product.module').then((m) => m.EditProductModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
