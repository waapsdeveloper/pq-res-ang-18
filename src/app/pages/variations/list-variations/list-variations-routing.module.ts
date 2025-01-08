import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVariationsComponent } from './list-variations.component';

const routes: Routes = [
  {
    path: '',
    component: ListVariationsComponent,
    data: { breadcrumb: 'list' }, // Root breadcrumb
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListVariationsRoutingModule { }
