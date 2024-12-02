import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RtablesComponent } from './rtables.component';

const routes: Routes = [
  {
    path: '',
    component: RtablesComponent,
    data: { breadcrumb: 'Table' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-rtables/list-rtables.module').then((m) => m.ListRtablesModule),
      },
      {
        path: 'add',
        loadChildren: () => import('./add-rtables/add-rtables.module').then((m) => m.AddRtablesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RtablesRoutingModule { }
