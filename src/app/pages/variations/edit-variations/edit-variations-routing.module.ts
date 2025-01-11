import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditVariationsComponent } from './edit-variations.component';

const routes: Routes = [
  {
    path: '',
    component: EditVariationsComponent,
    data: { breadcrumb: 'Edit' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditVariationsRoutingModule {}
