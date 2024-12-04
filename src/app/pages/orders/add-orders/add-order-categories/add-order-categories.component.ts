import { Component } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-add-order-categories',
  templateUrl: './add-order-categories.component.html',
  styleUrl: './add-order-categories.component.scss'
})
export class AddOrderCategoriesComponent {

  categories: any[] = [];

  constructor(private network: NetworkService){
    this.initialize()
  }

  async initialize(){
    let obj = {
      perpage: 500,
      page: 1
    }
    const res = await this.network.getCategories(obj)
    // console.log(res)

    if(res.data){
      let d = res.data.data;
      console.log(d)
      this.categories = d;
    }
  }

  setActiveCategory(item){

    for(var i = 0; i < this.categories.length; i++){
      this.categories[i]["active"] = this.categories[i]["name"] == item["name"];
    }
  }

}
