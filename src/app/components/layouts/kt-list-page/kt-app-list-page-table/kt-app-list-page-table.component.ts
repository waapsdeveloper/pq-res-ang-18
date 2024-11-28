import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kt-app-list-page-table',
  templateUrl: './kt-app-list-page-table.component.html',
  styleUrl: './kt-app-list-page-table.component.scss'
})
export class KtAppListPageTableComponent {

  @Input('columns') columns: any[] = [];
}
