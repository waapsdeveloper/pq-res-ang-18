import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../theme/layout/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then((m) => m.SplashModule)
  },
  {
    path: 'pre-splash',
    loadChildren: () => import('./pre-splash/pre-splash.module').then((m) => m.PreSplashModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule)
  },
  {
    path: 'restaurants',
    loadChildren: () => import('./restaurants/restaurants.module').then((m) => m.RestaurantsModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then((m) => m.CategoriesModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule)
  },
  {
    path: 'variations',
    loadChildren: () => import('./variations/variations.module').then((m) => m.VariationsModule)
  },
  {
    path: 'tables',
    loadChildren: () => import('./rtables/rtables.module').then((m) => m.RtablesModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule)
  },

  {
    path: 'invoices',
    loadChildren: () => import('./invoices/invoices.module').then((m) => m.InvoicesModule)
  },
  {
    path: 'table-booking',
    loadChildren: () => import('./table-booking/table-booking.module').then((m) => m.TableBookingModule)
  },

  // {
  //   path: '',
  //   component: AdminComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: '/dashboard',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'default',
  //       loadComponent: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  //     },
  //     {
  //       path: 'typography',
  //       loadComponent: () => import('../demo/elements/typography/typography.component')
  //     },
  //     {
  //       path: 'color',
  //       loadComponent: () => import('../demo/elements/element-color/element-color.component')
  //     },
  //     {
  //       path: 'sample-page',
  //       loadComponent: () => import('../demo/sample-page/sample-page.component')
  //     }
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
