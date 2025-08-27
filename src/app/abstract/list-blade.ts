import { Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from '../services/utility.service';

export abstract class ListBlade {
  search = '';
  page = 1;
  lastPage = -1;
  total = 0;
  perpage = 50;
  list: any[] = [];
  filters = false;
  selectAll: boolean = false;

  form = new FormGroup({});
  model;
  public debounceTimer: any;

  constructor(
    injector: Injector,
    protected crudService: any
  ) {}

  changePerPage(event: any) {
    this.crudService.onChangePerPage(event.target.value);
  }

  changePage(event: any) {
    this.crudService.pageChange(event);
  }

  toggleFilters() {
    this.crudService.onFilter(!this.crudService.filters);
  }

  submitFilters(model: any) {
    this.crudService.onSubmit(model);
  }

  loadMoreData() {
    this.crudService.loadMore();
  }

  changeSelectAll($event) {
    this.crudService.onSelectedAll($event);
  }

  deleteAll($event: any) {
    this.crudService.deleteAll();
  }
  changePageSize(event: any): void {
    const pageSize = parseInt(event, 50);
    console.log('Page size changed:', pageSize);
    if (this.crudService.onPageSizeChange) {
      this.crudService.onPageSizeChange(pageSize); // Call the service method
    } else {
      console.error('onPageSizeChange is not defined in the service.');
    }
  }
  checkboxUpdate(i, $event) {
    const isChecked = ($event.target as HTMLInputElement).checked;
    const count = this.crudService.onSelectedOne(i, isChecked);
    this.selectAll = count > 0;
  }

  debouncedSubmitFilters(model: any): void {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.submitFilters(model);
      console.log(model);
    }, 700); // Adjust the delay to 500ms or 1000ms as needed
  }
}
