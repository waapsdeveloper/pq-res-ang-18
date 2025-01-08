import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewVariationsComponent } from './view-variations.component';

const routes: Routes = [
  {
    path: '',
    component: ViewVariationsComponent,
    data: { breadcrumb: 'View' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewVariationsRoutingModule {}
