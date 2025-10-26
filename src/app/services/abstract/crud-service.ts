export interface OrderAmount {
  taxAmount: number;
  discountAmount: number;
  subTotal: number;
  totalAmount: number;
}

export abstract class BaseCrudService<T> {
  protected abstract fetchData(params: any): Promise<any>;
  protected abstract deleteItemById(id: any): Promise<any>;
  protected abstract fetchDeletedData(params: any): Promise<any>;
  protected abstract restoreItemById(id: any): Promise<any>;
  protected abstract forceDeleteItemById(id: any): Promise<any>;

  public list: T[] = [];
  public page: number = 1;
  public lastPage: number = -1;
  public total: number = 0;
  public perpage: number = 50;
  public filters: any = null;
  public search: string = '';
  public loading: boolean = false;
 public amount: OrderAmount = {
    taxAmount: 0,
    discountAmount: 0,
    subTotal: 0,
    totalAmount: 0
  };
  public
  async getList(search: string = '', page: number = 1): Promise<any> {
    const obj = {
      search,
      page,
      perpage: this.perpage,
      filters: this.filters ? JSON.stringify(this.filters) : null
    };

    this.loading = true;
    const res = await this.fetchData(obj);
    this.loading = false;

    if (res?.data) {
      const d = res.data;
      this.page = d.current_page;
      this.lastPage = d.last_page;
      this.total = d.total;

      // Replace or append data to the list
      //this.list = page === 1 ? d.data : [...this.list, ...d.data];
      this.list = d.data;
      this.amount = {
        taxAmount: res.total_tax.toFixed(2),
        discountAmount: res.total_discount.toFixed(2),
        subTotal: res.total_price.toFixed(2),
        totalAmount: res.total_final_total.toFixed(2),

      }
    }

    return res;
  }
  // 🔹 Fetch deleted list
  async getDeletedList(search: string = '', page: number = 1): Promise<any> {
    const obj = {
      search,
      page,
      perpage: this.perpage,
      filters: this.filters ? JSON.stringify(this.filters) : null
    };

    this.loading = true;
    const res = await this.fetchDeletedData(obj);
    this.loading = false;

    if (res?.data) {
      const d = res.data;
      this.page = d.current_page;
      this.lastPage = d.last_page;
      this.total = d.total;
      this.list = d.data;
    }

    return res;
  }

  async deleteRow(index: number, utility: any): Promise<void> {
    const item = this.list[index] as any;

    if (!item) {
      utility.presentFailureToast('Item not found in list');
      return;
    }

    const flag = await utility.presentConfirm('Delete', 'Cancel', 'Delete Record', 'Are you sure you want to delete?');
    if (flag) {
      await this.deleteItemById(item.id);
      this.list.splice(index, 1);
    }
  }
  async restoreRow(index: number, utility: any): Promise<void> {
    const item = this.list[index] as any;

    if (!item) {
      utility.presentFailureToast('Item not found in list');
      return;
    }

    const flag = await utility.presentConfirm('Restore', 'Cancel', 'Restore Record', 'Are you sure you want to restore?');
    if (flag) {
      await this.restoreItemById(item.id);
      this.list.splice(index, 1);
    }
  }
  async forceDeleteRow(index: number, utility: any): Promise<void> {
    const item = this.list[index] as any;

    if (!item) {
      utility.presentFailureToast('Item not found in list');
      return;
    }

    const flag = await utility.presentConfirm('Permanent Delete', 'Cancel', 'Delete Record', 'This action cannot be undone. Are you sure?');
    if (flag) {
      await this.forceDeleteItemById(item.id);
      this.list.splice(index, 1);
    }
  }


  onChangePerPage(perPage: number): void {
    this.perpage = perPage;
    this.getList('', 1);
  }

  pageChange(page: number): void {
    this.getList(this.search, page);
  }

  onSearch(searchValue: string): void {
    this.search = searchValue;
    this.getList(this.search, 1);
  }

  onFilter(toggleFilters: boolean): void {
    this.filters = toggleFilters ? {} : null;

    // if (!this.filters) {
    //   this.search = '';
    //   this.getList('', 1);
    // }
  }

  onSubmit(model: any): void {
    this.search = '';
    this.filters = model;
    this.getList('', 1);
  }

  resetFilters(model): void {
    this.search = '';
    this.filters = model;
    this.page = 1;
    this.getList('', 1);
  }

  loadMore(): void {
    if (this.page < this.lastPage) {
      this.getList(this.search, this.page + 1);
    }
  }

  onSelectedAll($event: boolean): void {
    this.list.forEach((item: any) => (item.selected = $event));
  }

  onSelectedOne(index: number, $event: boolean): number {
    this.list[index]['selected'] = $event;
    // get selected count
    console.log(this.list[index]);
    return this.list.filter((item: any) => item.selected).length;
  }

  deleteAll(): void {
    const selected = this.list.filter((item: any) => item.selected);
    if (selected.length === 0) {
      return;
    }

    selected.forEach(async (item: any) => {
      await this.deleteItemById(item.id);
      this.list = this.list.filter((i: any) => i.id !== item.id);
    });

    this.getList(this.search, this.page);
  }
}
