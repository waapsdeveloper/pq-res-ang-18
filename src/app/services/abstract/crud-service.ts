

export abstract class BaseCrudService<T> {

  protected abstract fetchData(params: any): Promise<any>;
  protected abstract deleteItemById(id: any): Promise<any>;

  public list: T[] = [];
  public page: number = 1;
  public lastPage: number = -1;
  public total: number = 0;
  public perpage: number = 10;
  public filters: any = null;
  public search: string = '';
  public loading: boolean = false;

  async getList(search: string = '', page: number = 1): Promise<any> {

    const obj = {
      search,
      page,
      perpage: this.perpage,
      filters: this.filters ? JSON.stringify(this.filters) : null,
    };

    this.loading = true;
    const res = await this.fetchData(obj);
    this.loading = false;

    if (res.data) {
      const d = res.data;
      this.page = d.current_page;
      this.lastPage = d.last_page;
      this.total = d.total;

      // Replace or append data to the list
      //this.list = page === 1 ? d.data : [...this.list, ...d.data];
      this.list = d.data;
    }

    return res;
  }

  async deleteRow(index: number, utility: any): Promise<void> {
    const item = this.list[index] as any;

    if (!item) {
      utility.presentFailureToast("Item not found in list");
      return;
    }

    const flag = await utility.presentConfirm('Delete', 'Cancel', 'Delete Record', 'Are you sure you want to delete?');
    if (flag) {
      await this.deleteItemById(item.id);
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

    if (!this.filters) {
      this.search = '';
      this.getList('', 1);
    }
  }

  onSubmit(model: any): void {
    this.search = '';
    this.filters = model;
    this.getList('', 1);
  }

  loadMore(): void {
    if (this.page < this.lastPage) {
      this.getList(this.search, this.page + 1);
    }
  }

  onSelectedAll($event: boolean): void {
    this.list.forEach((item: any) => item.selected = $event);
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
