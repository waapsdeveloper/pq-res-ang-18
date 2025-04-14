import { Title } from '@angular/platform-browser';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-kt-list-page',
  templateUrl: './kt-list-page.component.html',
  styleUrl: './kt-list-page.component.scss',
  encapsulation: ViewEncapsulation.None // Ensure styles are not scoped
})
export class KtListPageComponent {

  @Input('showCreate') showCreate = true;
  @Input('title') title = ''
  @Input('addurl') addurl = ''
  @Input ('showDeleteAll') showDeleteAll = false;
  @Output('onSearch') onSearch = new EventEmitter<any>();
  @Output('onFilter') onFilter = new EventEmitter<any>();
  @Output('onDeleteAll') onDeleteAll = new EventEmitter<any>();

  search($event){
    let v = $event.target.value;
    this.onSearch.emit(v);
  }

  filter($event){
    this.onFilter.emit();
  }
}
