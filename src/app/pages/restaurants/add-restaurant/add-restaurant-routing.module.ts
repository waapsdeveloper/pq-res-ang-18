import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRestaurantComponent } from './add-restaurant.component';

const routes: Routes = [
  {
    path: '',
    component: AddRestaurantComponent,
    data: { breadcrumb: 'Add' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRestaurantRoutingModule { }
