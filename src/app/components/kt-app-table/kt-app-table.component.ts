import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kt-app-table',
  templateUrl: './kt-app-table.component.html',
  styleUrl: './kt-app-table.component.scss'
})
export class KtAppTableComponent {

  @Input('columns') columns: any[] = [];

}
