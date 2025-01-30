import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditMessageComponent } from './edit-message.component';
const routes: Routes = [
  {
    path: '',
    component: EditMessageComponent,
    data: { breadcrumb: 'Edit' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditMessageRoutingModule {}
