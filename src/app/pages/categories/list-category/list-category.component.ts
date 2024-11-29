import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent {

  title = 'Categories';
  addurl = '/pages/categories/add'
  search = '';
  page = 1;
  lastPage = -1;
  total = 0;
  perpage = 10;
  list: any[] = [];

  columns: any[] = [
    'Name',
    'parent category',
    'Status'
  ]

  constructor(
    private nav: NavService,
    private network: NetworkService
  ) {
    this.initialize();
  }

  initialize() {
    this.getList('', 1);
  }

  async getList(search = '', page = 1): Promise<any> {
    let obj = {
      search: search,
      page: page,
      perpage: this.perpage
    };

    const res = await this.network.getCategories(obj);
    if(res.data){

      let d = res.data;
      this.page = d.current_page;
      this.lastPage = d.last_page;
      this.total = d.total;

      if(this.page == 1){
        this.list = d.data;
      } else {
        this.list = [...this.list, ...d.data];
      }


    }

    return res;
  }

  editRow(index: number) {

  }

  async deleteRow(index: number) {
    let item = this.list[index];
    if(item){
      await this.network.removeCategory(item.id);
    }
    this.list.splice(index, 1);
  }

  loadMore() {
    if(this.page < this.lastPage){
      this.getList(this.search, this.page + 1);
    }
  }

  openDetails(id) {
    this.nav.push('/pages/restaurants/view/' + id);
  }

  onChangePerPage($event){
    this.getList('', 1);
  }

}
