import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './restaurants.component';
import { permissionGuard } from '../../guards/permission.guard'; // <-- Import the guard

const routes: Routes = [
  {
    path: '',
    component: RestaurantsComponent,
    data: { breadcrumb: 'Restaurant' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-restaurant/list-restaurant.module').then((m) => m.ListRestaurantModule),
        data: { entity: 'branch', action: 'list' },
        canActivate: [permissionGuard]
      },
      {
        path: 'add',
        loadChildren: () => import('./add-restaurant/add-restaurant.module').then((m) => m.AddRestaurantModule),
        data: { entity: 'branch', action: 'add' },
        canActivate: [permissionGuard]
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-restaurant/edit-restaurant.module').then((m) => m.EditRestaurantModule),
        data: { entity: 'branch', action: 'edit' },
        canActivate: [permissionGuard]
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-restaurant/view-restaurant.module').then((m) => m.ViewRestaurantModule),
        data: { entity: 'branch', action: 'view' },
        canActivate: [permissionGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
