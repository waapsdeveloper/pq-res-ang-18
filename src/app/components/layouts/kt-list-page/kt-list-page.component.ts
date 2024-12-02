import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kt-list-page',
  templateUrl: './kt-list-page.component.html',
  styleUrl: './kt-list-page.component.scss'
})
export class KtListPageComponent {

  @Input('title') title = ''
  @Input('addurl') addurl = ''
}
