import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages.component';

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
      },
      {
        path: 'add',
        loadChildren: () => import('./add-message/add-message.module').then((m) => m.AddMessageModule)
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-message/view-message.module').then((m) => m.ViewMessageModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-message/edit-message.module').then((m) => m.EditMessageModule)
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
