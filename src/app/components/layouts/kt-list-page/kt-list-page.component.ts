import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-kt-list-page',
  templateUrl: './kt-list-page.component.html',
  styleUrl: './kt-list-page.component.scss'
})
export class KtListPageComponent {

  @Input('title') title = ''
  @Input('addurl') addurl = ''
  @Output('onSearch') onSearch = new EventEmitter<any>();
  @Output('onFilter') onFilter = new EventEmitter<any>();

  search($event){
    let v = $event.target.value;
    this.onSearch.emit(v);
  }

  filter($event){
    this.onFilter.emit();
  }
}
