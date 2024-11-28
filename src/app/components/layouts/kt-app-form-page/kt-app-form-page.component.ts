import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kt-app-form-page',
  templateUrl: './kt-app-form-page.component.html',
  styleUrl: './kt-app-form-page.component.scss'
})
export class KtAppFormPageComponent {

  @Input('title') title = ''
}
