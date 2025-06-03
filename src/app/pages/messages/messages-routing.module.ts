import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages.component';
import { permissionGuard } from '../../guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: MessagesComponent,
    data: { breadcrumb: 'Messages' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-message/list-message.module').then((m) => m.ListMessageModule),
        data: { entity: 'message', action: 'list' },
        canActivate: [permissionGuard]
      },
      {
        path: 'add',
        loadChildren: () => import('./add-message/add-message.module').then((m) => m.AddMessageModule),
        data: { entity: 'message', action: 'add' },
        canActivate: [permissionGuard]
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-message/view-message.module').then((m) => m.ViewMessageModule),
        data: { entity: 'message', action: 'view' },
        canActivate: [permissionGuard]
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-message/edit-message.module').then((m) => m.EditMessageModule),
        data: { entity: 'message', action: 'edit' },
        canActivate: [permissionGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
