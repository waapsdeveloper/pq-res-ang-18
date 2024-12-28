import { Injector } from "@angular/core";
import { FormGroup } from '@angular/forms';

export abstract class ListBlade{

  search = '';
  page = 1;
  lastPage = -1;
  total = 0;
  perpage = 10;
  list: any[] = [];
  filters = false;
  selectAll: boolean = false;

  form = new FormGroup({});
  model;

  constructor(injector: Injector, protected crudService: any) {

  }

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

  checkboxUpdate(i, $event) {
    const isChecked = ($event.target as HTMLInputElement).checked;
    const count = this.crudService.onSelectedOne(i, isChecked);
    this.selectAll = count > 0;
  }



}
