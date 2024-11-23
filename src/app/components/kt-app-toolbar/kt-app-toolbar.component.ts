import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kt-app-toolbar',
  templateUrl: './kt-app-toolbar.component.html',
  styleUrl: './kt-app-toolbar.component.scss'
})
export class KtAppToolbarComponent {

  @Input('title') title: string = 'Page'
}
