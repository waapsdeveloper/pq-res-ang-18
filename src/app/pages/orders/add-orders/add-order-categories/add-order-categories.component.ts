import { Component } from '@angular/core';

@Component({
  selector: 'app-add-order-categories',
  templateUrl: './add-order-categories.component.html',
  styleUrl: './add-order-categories.component.scss'
})
export class AddOrderCategoriesComponent {

  categories: any[] = [
    {
      "name": "Dairy Products",
      "category_id": null,
      "status": "active"
    },
    {
      "name": "Bakery Items",
      "category_id": null,
      "status": "active"
    },
    {
      "name": "Milk",
      "category_id": 1,
      "status": "active"
    },
    {
      "name": "Cheese",
      "category_id": 1,
      "status": "active"
    },
  ];

  setActiveCategory(item){

    for(var i = 0; i < this.categories.length; i++){
      this.categories[i]["active"] = this.categories[i]["name"] == item["name"];
    }
  }

}
