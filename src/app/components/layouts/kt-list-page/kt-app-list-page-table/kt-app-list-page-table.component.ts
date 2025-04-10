import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-kt-app-list-page-table',
  templateUrl: './kt-app-list-page-table.component.html',
  styleUrl: './kt-app-list-page-table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class KtAppListPageTableComponent {
  role_id: number = 1;
  loading = true; // Controls the loading state

  ngOnInit(): void {
    // Simulate a delay to load data
    setTimeout(() => {
      this.loading = false; // Stops loader when data is ready
    }, 1700); // Adjust time based on data fetch time
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

  constructor(private utility: UtilityService) {}
  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
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
