import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DsDataResolver } from '../resolvers/ds-data.service';
import { AdminComponent } from '../theme/layout/admin/admin.component';
import { permissionsResolver } from '../resolvers/permissions.resolver'; // <-- Import the resolver

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
    resolve: { permissions: permissionsResolver }
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then((m) => m.SplashModule),
    resolve: { permissions: permissionsResolver }
  },
  {
    path: 'pre-splash',
    loadChildren: () => import('./pre-splash/pre-splash.module').then((m) => m.PreSplashModule),
    resolve: { permissions: permissionsResolver }
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    resolve: {
      dsdata: DsDataResolver,
      permissions: permissionsResolver
    }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
    resolve: { permissions: permissionsResolver }
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule),
    resolve: { permissions: permissionsResolver }
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
    resolve: { permissions: permissionsResolver }
  },
  {
    path: 'restaurants',
    loadChildren: () => import('./restaurants/restaurants.module').then((m) => m.RestaurantsModule),
    resolve: {
      dsdata: DsDataResolver,
      permissions: permissionsResolver
    }
  },
  {
    path: 'coupons',
    loadChildren: () => import('./coupons/coupons.module').then((m) => m.CouponsModule),
    resolve: { permissions: permissionsResolver }
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then((m) => m.MessagesModule),
    resolve: { permissions: permissionsResolver }
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then((m) => m.CategoriesModule),
    resolve: { permissions: permissionsResolver }
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule),
    resolve: {
      dsdata: DsDataResolver,
      permissions: permissionsResolver
    }
  },
  {
    path: 'variations',
    loadChildren: () => import('./variations/variations.module').then((m) => m.VariationsModule),
    resolve: {
      dsdata: DsDataResolver,
      permissions: permissionsResolver
    }
  },
  {
    path: 'tables',
    loadChildren: () => import('./rtables/rtables.module').then((m) => m.RtablesModule),
    resolve: { permissions: permissionsResolver }
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule),
    resolve: {
      dsdata: DsDataResolver,
      permissions: permissionsResolver
    }
  },
  {
    path: 'invoices',
    loadChildren: () => import('./invoices/invoices.module').then((m) => m.InvoicesModule),
    resolve: {
      dsdata: DsDataResolver,
      permissions: permissionsResolver
    }
  },
  {
    path: 'table-booking',
    loadChildren: () => import('./table-booking/table-booking.module').then((m) => m.TableBookingModule),
    resolve: { permissions: permissionsResolver }
  },
  {
    path: 'branch-config',
    loadChildren: () => import('./branch-config/branch-config.module').then((m) => m.BranchConfigModule),
    resolve: { permissions: permissionsResolver }
  },
  {
    path: 'expense-categories',
    loadChildren: () => import('./expense-categories/expense-categories.module').then((m) => m.ExpenseCategoriesModule),
    resolve: {
      dsdata: DsDataResolver,
      permissions: permissionsResolver
    }
  },
  {
    path: 'expense',
    loadChildren: () => import('./expense/expense.module').then((m) => m.ExpenseModule),
    resolve: {
      dsdata: DsDataResolver,
      permissions: permissionsResolver
    }
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then((m) => m.RolesModule),
    resolve: {
      dsdata: DsDataResolver,
      permissions: permissionsResolver
    }
  }
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
export class PagesRoutingModule {}
