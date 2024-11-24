import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './list-product.component';

const routes: Routes = [
  {
    path: '',
    component: ListProductComponent,
    data: { breadcrumb: 'list' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListProductRoutingModule { }
