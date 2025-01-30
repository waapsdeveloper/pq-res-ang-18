import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewMessageComponent } from './view-message.component';

const routes: Routes = [
  {
    path: '',
    component: ViewMessageComponent,
    data: { breadcrumb: 'View' },

  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewMessageRoutingModule { }
