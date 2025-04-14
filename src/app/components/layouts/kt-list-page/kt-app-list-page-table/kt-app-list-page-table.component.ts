import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-kt-app-list-page-table',
  templateUrl: './kt-app-list-page-table.component.html',
  styleUrl: './kt-app-list-page-table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class KtAppListPageTableComponent {
  role_id: number = 1;
  loading = true;

  pageGroupSize: number = 5;
  visiblePageGroup: number = 0;

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1700);
    
  }

  @Input('columns') columns: any[] = [];
  @Input('totalPages') totalPages: number = 0;
  @Input('currentPage') currentPage: number = 0;
  @Input('bulkSelect') bulkSelect: number = 0;
  @Input('actions') actions: any[] = [];

  @Input('selectAll') selectAll: boolean = false;

  @Output('pageChange') pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output('changeSelectAll') changeSelectAll: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('actionDeleteAll') actionDeleteAll: EventEmitter<any> = new EventEmitter<any>();

  constructor(private utility: UtilityService, private events: EventsService) {
    this.events.subscribe('uncheck-select-all', () => {
      this.selectAll = false
    });
  }

  getPages(): number[] {
    const start = this.visiblePageGroup * this.pageGroupSize + 1;
    const end = Math.min(start + this.pageGroupSize - 1, this.totalPages);
    const pages: number[] = [];

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  goToNextPageGroup() {
    const maxGroup = Math.floor((this.totalPages - 1) / this.pageGroupSize);
    if (this.visiblePageGroup < maxGroup) {
      this.visiblePageGroup++;
    }
  }

  goToPrevPageGroup() {
    if (this.visiblePageGroup > 0) {
      this.visiblePageGroup--;
    }
  }

  updateSelectAll() {
    this.changeSelectAll.emit(this.selectAll);
  }

  deleteAll() {
    const flag = this.utility.presentConfirm('Delete', 'Cancel', 'Delete All Record', 'Are you sure you want to delete all?');
    if (!flag) {
      return;
    }
    this.actionDeleteAll.emit();
  }
}
