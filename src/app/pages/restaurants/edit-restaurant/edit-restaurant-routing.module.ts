import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRestaurantComponent } from './edit-restaurant.component';

const routes: Routes = [
  {
    path: '',
    component: EditRestaurantComponent,
    data: { breadcrumb: 'Edit' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRestaurantRoutingModule { }
