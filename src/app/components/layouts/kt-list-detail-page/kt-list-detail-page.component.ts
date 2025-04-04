import { Component, Input ,ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-kt-list-detail-page',
  templateUrl: './kt-list-detail-page.component.html',
  styleUrl: './kt-list-detail-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class KtListDetailPageComponent {

  @Input('title') title = ''

}
