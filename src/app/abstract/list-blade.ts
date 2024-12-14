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

  form = new FormGroup({});
  model;

  constructor(injector: Injector) {

  }



}
