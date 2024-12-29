import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-kt-app-list-page-table',
  templateUrl: './kt-app-list-page-table.component.html',
  styleUrl: './kt-app-list-page-table.component.scss'
})
export class KtAppListPageTableComponent {

  role_id: number = 1;

  @Input('columns') columns: any[] = [];
  @Input('totalPages') totalPages: number = 0;
  @Input('currentPage') currentPage: number = 0;
  @Input('bulkSelect') bulkSelect: number = 0;
  @Input('actions') actions: any[] = [];

  @Input('selectAll') selectAll: boolean = false;

  @Output('pageChange') pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output('changeSelectAll') changeSelectAll: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output('actionDeleteAll') actionDeleteAll: EventEmitter<any> = new EventEmitter<any>();


  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updateSelectAll() {
    this.changeSelectAll.emit(this.selectAll);
  }

  deleteAll() {
    this.actionDeleteAll.emit();
  }



}
