import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VariationsComponent } from './variations.component';
const routes: Routes = [
  {
    path: '',
    component: VariationsComponent,
    data: { breadcrumb: 'User' },
    children: [
      {
        path: '',

        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-variations/list-variations.module').then((m) => m.ListVariationsModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./add-variations/add-variations.module').then((m) => m.AddVariationsModule)
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-variations/view-variations.module').then((m) => m.ViewVariationsModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-variations/edit-variations.module').then((m) => m.EditVariationsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariationsRoutingModule {}
